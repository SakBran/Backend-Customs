using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using BackendCustoms.DepedencyInjections.Interface;
using BackendCustoms.DepedencyInjections.Service.CeirService.Request;
using BackendCustoms.DepedencyInjections.Service.CeirService.Response;
using Microsoft.Extensions.Caching.Memory;

namespace BackendCustoms.DepedencyInjections.Service
{
    public class CEIR_API_Service : ICEIR_API_Service
    {
        private readonly HttpClient _httpClient;
        private readonly IMemoryCache _cache;

        public CEIR_API_Service(IMemoryCache cache)
        {
            _httpClient = new HttpClient();
            _cache = cache;
        }

        public async Task<string> GetTokenAsync(GetTokenRequest request)
        {
            var cacheKey = "CEIRToken";
            if (!_cache.TryGetValue(cacheKey, out string? token))
            {
                // Token not found in cache, so we need to fetch it
                var tokenResponse = await FetchTokenAsync(request);
                token = tokenResponse.AccessToken;

                // Set cache options and store the data in cache
                var cacheEntryOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(60)
                };
                _cache.Set(cacheKey, token, cacheEntryOptions);
            }
            if (token == null)
            {
                throw new InvalidOperationException("Token not found.");
            }
            return token;
        }

        public async Task<string> PaymentConfirmation(ConfirmationRequest request)
        {
            using var client = _httpClient;
            // Set the request headers
            client.DefaultRequestHeaders.Add("Content-Type", "application/json");
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + request.Token);

            // Build your request body
            var body = new PaymentConfirmationRequest();
            body = request.body;


            var json = System.Text.Json.JsonSerializer.Serialize(body);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            // Make the POST request
            var response = await client.PostAsync(request.ApiURl, content);
            // Handle the response
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadAsStringAsync();
                return result;
            }
            else
            {
                Console.WriteLine($"Error: {response.StatusCode}");
                throw new Exception($"Error: {response.StatusCode}");
            }
        }

        private async Task<TokenResponseDTO> FetchTokenAsync(GetTokenRequest request)
        {
            using var client = _httpClient;
            // Set the request headers
            client.DefaultRequestHeaders.Add("Content-Type", "application/json");
            // Build your request body
            var body = new
            {
                principal = request.principal,
                credentials = request.credentials,
                mode = "BASIC"
            };

            var json = System.Text.Json.JsonSerializer.Serialize(body);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            // Make the POST request
            var response = await client.PostAsync(request.authUrl, content);
            // Handle the response
            if (response.IsSuccessStatusCode)
            {
                var temp = await response.Content.ReadAsStringAsync();
                var result = System.Text.Json.JsonSerializer.Deserialize<TokenResponseDTO>(temp);
                if (result == null)
                {
                    throw new InvalidOperationException("Failed to deserialize token response.");
                }
                return result;
            }
            else
            {
                Console.WriteLine($"Error: {response.StatusCode}");
                throw new Exception($"Error: {response.StatusCode}");
            }
        }

    }
}