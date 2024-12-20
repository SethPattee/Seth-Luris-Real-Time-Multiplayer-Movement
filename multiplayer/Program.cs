// using System.Net.WebSockets;
// using Microsoft.AspNetCore.Builder;
// using Microsoft.AspNetCore.Http;
// using Microsoft.Extensions.DependencyInjection;
// using System.Text;
// using System.Threading;
// using System.Threading.Tasks;
// using System.Collections.Concurrent;

// var builder = WebApplication.CreateBuilder(args);
// builder.Services.AddCors();
// var app = builder.Build();

// app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
// app.UseWebSockets();

// var connectedClients = new ConcurrentBag<WebSocket>();

// app.MapGet("/", () => "WebSocket Server Running!");

// app.Use(async (context, next) =>
// {
//     if (context.Request.Path == "/ws")
//     {
//         if (context.WebSockets.IsWebSocketRequest)
//         {
//             using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
//             Console.WriteLine("WebSocket connected");

//             connectedClients.Add(webSocket);
//             await HandleWebSocketConnection(webSocket, connectedClients);

//             Console.WriteLine("WebSocket disconnected");
//         }
//         else
//         {
//             context.Response.StatusCode = StatusCodes.Status400BadRequest;
//         }
//     }
//     else
//     {
//         await next();
//     }
// });

// app.Run("http://localhost:5000");
// static async Task HandleWebSocketConnection(WebSocket webSocket, ConcurrentBag<WebSocket> clients)
// {
//     var buffer = new byte[1024 * 4];

//     try
//     {
//         while (webSocket.State == WebSocketState.Open)
//         {
//             var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

//             if (result.MessageType == WebSocketMessageType.Close)
//             {
//                 break;
//             }

//             var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
//             Console.WriteLine($"Received: {message}");

//             foreach (var client in clients)
//             {
//                 if (client != webSocket && client.State == WebSocketState.Open)
//                 {
//                     var data = Encoding.UTF8.GetBytes(message);
//                     await client.SendAsync(new ArraySegment<byte>(data), WebSocketMessageType.Text, true, CancellationToken.None);
//                 }
//             }
//         }
//     }
//     catch (Exception ex)
//     {
//         Console.WriteLine($"Error: {ex.Message}");
//     }
//     finally
//     {
//         clients.TryTake(out _);
//         await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Connection closed", CancellationToken.None);
//     }
// }


using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS to be more permissive
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.SetIsOriginAllowed(_ => true)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Enable CORS and WebSockets
app.UseCors("AllowAll");
app.UseWebSockets(new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromSeconds(120)
});

var connectedClients = new ConcurrentBag<WebSocket>();

app.MapGet("/", () => "WebSocket Server Running!");

app.Use(async (context, next) =>
{
    if (context.Request.Path == "/ws")
    {
        if (context.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
            Console.WriteLine("WebSocket connected");
            connectedClients.Add(webSocket);
            
            try 
            {
                await HandleWebSocketConnection(webSocket, connectedClients);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"WebSocket handling error: {ex.Message}");
            }
            finally 
            {
                connectedClients.TryTake(out _);
                Console.WriteLine("WebSocket disconnected");
            }
        }
        else
        {
            context.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }
    else
    {
        await next();
    }
});

app.Run("http://localhost:5000");

static async Task HandleWebSocketConnection(WebSocket webSocket, ConcurrentBag<WebSocket> clients)
{
    var buffer = new byte[1024 * 4];
    
    try 
    {
        while (webSocket.State == WebSocketState.Open)
        {
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            
            if (result.MessageType == WebSocketMessageType.Close)
            {
                await webSocket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
                break;
            }
            
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            Console.WriteLine($"Received: {message}");
            
            // Broadcast to all clients except sender
            foreach (var client in clients)
            {
                if (client != webSocket && client.State == WebSocketState.Open)
                {
                    var data = Encoding.UTF8.GetBytes(message);
                    await client.SendAsync(
                        new ArraySegment<byte>(data), 
                        WebSocketMessageType.Text, 
                        true, 
                        CancellationToken.None
                    );
                }
            }
        }
    }
    catch (WebSocketException ex)
    {
        Console.WriteLine($"WebSocket Exception: {ex.Message}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"General Exception: {ex.Message}");
    }
}