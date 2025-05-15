using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using API.DBContext;
using API.Model;
using BackendCustoms.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendCustoms.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeleteLogsController : BaseAPIController<CeiridFromIRD_DeletedLog>
    {
        private readonly ApplicationDbContext _context;
        public DeleteLogsController(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Filter")]
        public async Task<ActionResult<ApiResult<CeiridFromIRD_DeletedLog>>> SentList(
                        DateTime? fromDate,
                        DateTime? toDate,
                        DateTime? SentDateFrom,
                        DateTime? SentDateTo,
                        string? CeirId,
                        bool? isSent,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string? sortColumn = null,
                        string? sortOrder = null,
                        string? filterColumn = null,
                        string? filterQuery = null)
        {
            var query = _context.ceiridFromIRD_DeletedLogs.AsNoTracking();
            if (SentDateFrom != null)
            {
                query = query.Where(x => x.SendDatetime >= SentDateFrom);
            }
            if (SentDateTo != null)
            {
                query = query.Where(x => x.SendDatetime <= SentDateTo);
            }
            if (fromDate != null)
            {
                query = query.Where(x => x.DeletedDateTime >= fromDate);
            }
            if (toDate != null)
            {
                query = query.Where(x => x.DeletedDateTime <= toDate);
            }
            if (!String.IsNullOrEmpty(CeirId))
            {
                query = query.Where(x => x.CEIRID == CeirId);
            }
            if (isSent != null)
            {
                query = query.Where(x => x.IsSent == isSent);
            }

            return await ApiResult<CeiridFromIRD_DeletedLog>.CreateAsync(
                    query,
                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);
        }
    }
}