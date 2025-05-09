using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interface
{
    public interface ICommonService<T>
    {
        Task<int> Create(T entity);
        Task<int> CreateList(List<T> entities);
        IQueryable<T> Retrieve { get; }
        Task<int> Update(string id, T entity);
        Task<int> Delete(string id);

    }
}
