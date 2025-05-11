using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DBContext;
using API.Model;
using BackendCustoms.Controllers.CustomsData.Request;
using BackendCustoms.DepedencyInjections.Interface;
using BackendCustoms.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendCustoms.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomsDataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CustomsDataController(ApplicationDbContext context)
        {
            _context = context;
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
    }
}