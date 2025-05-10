using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.DepedencyInjections.Interface
{
    public interface IReportFilterQueryService<T>
    {
        Task<IQueryable<T>> GenerateQuery(T filter, IQueryable<T> source);
    }
}