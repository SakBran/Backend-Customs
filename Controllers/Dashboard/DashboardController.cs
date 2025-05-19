using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DBContext;
using BackendCustoms.Controllers.Dashboard.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace BackendCustoms.Controllers.Dashboard
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMemoryCache _cache;
        public DashboardController(ApplicationDbContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetDaily()
        {
            const string cacheKey = "GetDailyResponse";
            if (_cache.TryGetValue(cacheKey, out GetDailyResponse? cachedResponse))
            {
                return Ok(cachedResponse);
            }

            var today = DateTime.Today;

            var customsDataQuery = _context.CustomsDatas
                .AsNoTracking()
                .Where(x => x.SentDatetime >= today);

            var customsDataList = await customsDataQuery.ToListAsync();

            var sentList = customsDataList.Where(x => x.Status == AppConfig.Sent).ToList();
            var failedCount = customsDataList.Count(x => x.Status == AppConfig.Failed);
            var notSentCount = customsDataList.Count(x => x.Status == AppConfig.NotSent);

            var ceiridList = await _context.ceiridFromIRDs
                .AsNoTracking()
                .Where(x => x.ReceivedDatetime >= today)
                .ToListAsync();

            var response = new GetDailyResponse
            {
                Sent = sentList.Count,
                Failed = failedCount,
                NotSent = notSentCount,
                Ceirid = ceiridList.Count,
                SentList = sentList,
                CeiridList = ceiridList
            };

            // Cache the response with a 5-minute sliding expiration
            var cacheOptions = new MemoryCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromMinutes(5));

            _cache.Set(cacheKey, response, cacheOptions);

            return Ok(response);
        }

    }
}