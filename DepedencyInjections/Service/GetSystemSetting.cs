using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DBContext;
using BackendCustoms.DepedencyInjections.Interface;
using BackendCustoms.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace BackendCustoms.DepedencyInjections.Service
{
    public class GetSystemSetting : IGetSystemSetting
    {
        private readonly ApplicationDbContext _context;
        private readonly IMemoryCache _cache;
        public GetSystemSetting(ApplicationDbContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;
        }

        public async Task<SystemSetting> GetAsync()
        {
            var cacheKey = "SystemSetting";
            if (!_cache.TryGetValue(cacheKey, out SystemSetting? systemSettings))
            {
                var temp = await _context.systemSettings.FirstOrDefaultAsync()!;
                if (temp == null)
                {
                    throw new InvalidOperationException("System settings not found.");
                }
                systemSettings = temp;
                if (systemSettings == null)
                {
                    throw new InvalidOperationException("System settings not found.");
                }

                // Set cache options and store the data in cache
                var cacheEntryOptions = new MemoryCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(1440)
                };
                _cache.Set(cacheKey, systemSettings, cacheEntryOptions);
            }
            return systemSettings ?? throw new InvalidOperationException("System settings not found.");

        }
    }
}