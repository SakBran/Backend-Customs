using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendCustoms.DepedencyInjections.Interface;
using Microsoft.AspNetCore.Http;

namespace BackendCustoms.DepedencyInjections.Service
{
    public class GetAccessTokenService:IGetaccessTokenService
    {
         private readonly IHttpContextAccessor _httpContextAccessor;

        public GetAccessTokenService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public string GetaccessTokenAsync()
        {
            var authHeader = _httpContextAccessor?.HttpContext?.Request.Headers["Authorization"].ToString();
            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                string accessToken = authHeader["Bearer ".Length..].Trim();
                return accessToken;
            }
            return "";
        }
    }
}