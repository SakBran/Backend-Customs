using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.DBContext;
using API.Model;
using BackendCustoms.Controllers.CustomsData.Request;
using BackendCustoms.DepedencyInjections.Interface;
using BackendCustoms.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendCustoms.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class CustomsDataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IGetaccessTokenService _getToken;

        public CustomsDataController(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor, IGetaccessTokenService getToken)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
            _getToken = getToken;
        }

        [HttpGet]
        [Route("SentList")]
        public async Task<ActionResult<ApiResult<BackendCustoms.Model.CustomsData>>> SentList(
                        DateTime? RoDateFrom,
                        DateTime? RoDateTo,
                        DateTime? SentDateFrom,
                        DateTime? SentDateTo,
                        string? CeirId,
                        string? RoNo,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string? sortColumn = null,
                        string? sortOrder = null,
                        string? filterColumn = null,
                        string? filterQuery = null)
        {
            var query = _context.CustomsDatas.AsNoTracking().Where(x => x.Status == AppConfig.Sent);
            if (SentDateFrom != null)
            {
                query = query.Where(x => x.SentDatetime >= SentDateFrom);
            }
            if (SentDateTo != null)
            {
                query = query.Where(x => x.SentDatetime <= SentDateTo);
            }
            if (RoDateFrom != null)
            {
                query = query.Where(x => x.RODate >= RoDateFrom);
            }
            if (RoDateTo != null)
            {
                query = query.Where(x => x.RODate <= RoDateTo);
            }
            if (!String.IsNullOrEmpty(CeirId))
            {
                query = query.Where(x => x.MaccsCEIRID == CeirId);
            }
            if (!String.IsNullOrEmpty(RoNo))
            {
                query = query.Where(x => x.RONo == RoNo);
            }

            return await ApiResult<BackendCustoms.Model.CustomsData>.CreateAsync(
                    query,
                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);
        }

        [HttpGet]
        [Route("FailedList")]
        public async Task<ActionResult<ApiResult<BackendCustoms.Model.CustomsData>>> FailedList(
                         DateTime? RoDateFrom,
                        DateTime? RoDateTo,
                        DateTime? SentDateFrom,
                        DateTime? SentDateTo,
                        string? CeirId,
                        string? RoNo,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string? sortColumn = null,
                        string? sortOrder = null,
                        string? filterColumn = null,
                        string? filterQuery = null)
        {
            var query = _context.CustomsDatas.AsNoTracking().Where(x => x.Status == AppConfig.Failed);
            if (SentDateFrom != null)
            {
                query = query.Where(x => x.SentDatetime >= SentDateFrom);
            }
            if (SentDateTo != null)
            {
                query = query.Where(x => x.SentDatetime <= SentDateTo);
            }
            if (RoDateFrom != null)
            {
                query = query.Where(x => x.RODate >= RoDateFrom);
            }
            if (RoDateTo != null)
            {
                query = query.Where(x => x.RODate <= RoDateTo);
            }
            if (!String.IsNullOrEmpty(CeirId))
            {
                query = query.Where(x => x.MaccsCEIRID == CeirId);
            }
            if (!String.IsNullOrEmpty(RoNo))
            {
                query = query.Where(x => x.RONo == RoNo);
            }

            return await ApiResult<BackendCustoms.Model.CustomsData>.CreateAsync(
                    query,
                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);
        }


        [HttpGet]
        [Route("NotSentList")]
        public async Task<ActionResult<ApiResult<BackendCustoms.Model.CustomsData>>> NotSentList(
                        DateTime? RoDateFrom,
                        DateTime? RoDateTo,
                        string? CeirId,
                        string? RoNo,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string? sortColumn = null,
                        string? sortOrder = null,
                        string? filterColumn = null,
                        string? filterQuery = null)
        {
            var query = _context.CustomsDatas.AsNoTracking().Where(x => x.Status == AppConfig.NotSent);

            if (RoDateFrom != null)
            {
                query = query.Where(x => x.RODate >= RoDateFrom);
            }
            if (RoDateTo != null)
            {
                query = query.Where(x => x.RODate <= RoDateTo);
            }
            if (!String.IsNullOrEmpty(CeirId))
            {
                query = query.Where(x => x.MaccsCEIRID == CeirId);
            }
            if (!String.IsNullOrEmpty(RoNo))
            {
                query = query.Where(x => x.RONo == RoNo);
            }

            return await ApiResult<BackendCustoms.Model.CustomsData>.CreateAsync(
                    query,
                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);
        }

        [HttpGet]
        [Route("DuplicateList")]
        public async Task<ActionResult<ApiResult<BackendCustoms.Model.CustomsData>>> DuplicateList(
                         DateTime? RoDateFrom,
                        DateTime? RoDateTo,
                        string? CeirId,
                        string? RoNo,
                        int pageIndex = 0,
                        int pageSize = 10,
                        string? sortColumn = null,
                        string? sortOrder = null,
                        string? filterColumn = null,
                        string? filterQuery = null)
        {
            var query = _context.CustomsDatas.AsNoTracking().Where(x => x.Status == AppConfig.Duplicate);

            if (RoDateFrom != null)
            {
                query = query.Where(x => x.RODate >= RoDateFrom);
            }
            if (RoDateTo != null)
            {
                query = query.Where(x => x.RODate <= RoDateTo);
            }
            if (!String.IsNullOrEmpty(CeirId))
            {
                query = query.Where(x => x.MaccsCEIRID == CeirId);
            }
            if (!String.IsNullOrEmpty(RoNo))
            {
                query = query.Where(x => x.RONo == RoNo);
            }

            return await ApiResult<BackendCustoms.Model.CustomsData>.CreateAsync(
                    query,
                    pageIndex,
                    pageSize,
                    sortColumn,
                    sortOrder,
                    filterColumn,
                    filterQuery);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCeirid(string id, EditCeiridRequest request)
        {

            var temp = await _context.CustomsDatas.Where(x => x.id == id).FirstOrDefaultAsync();
            if (temp != null)
            {
                var user = new User();
                var token = await _context.TokenModels.Where(x => x.Token == _getToken.GetaccessTokenAsync()).FirstOrDefaultAsync();
                if (token != null)
                {
                    user = await _context.Users.Where(x => x.Id == token.UserId).FirstOrDefaultAsync();
                }

                temp.CEIRID = request.ceirId;
                temp.MaccsCEIRID = temp.CEIRID;
                temp.Remark = request.remark;
                temp.EditBy = user?.FullName;
                temp.EditById = user?.Id;
                await _context.SaveChangesAsync();
                return Ok(temp);
            }
            else
            {
                return NotFound();
            }
        }
    }
}