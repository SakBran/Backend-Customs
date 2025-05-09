using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BackendCustoms.DepedencyInjections.Service.CeirService.Response
{
    public class TokenResponseDTO
    {

        [JsonPropertyName("tokenType")]
        public string? TokenType { get; set; }

        [JsonPropertyName("accessToken")]
        public string? AccessToken { get; set; }

        [JsonPropertyName("expiresIn")]
        public int ExpiresIn { get; set; } // Typically in seconds

        [JsonPropertyName("refreshToken")]
        public string? RefreshToken { get; set; }

    }
}