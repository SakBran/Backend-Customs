using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using BackendCustoms.DepedencyInjections.Interface;

namespace BackendCustoms.DepedencyInjections.Service
{
    public class ReportFilterQueryService<T> : IReportFilterQueryService<T> where T : class
    {
        public async Task<IQueryable<T>> GenerateQuery(T filter, IQueryable<T> source)
        {
            await Task.Run(() =>
            {
                foreach (var p in typeof(T).GetProperties())
                {
                    string propertyName = p.Name;
                    var propertyType = typeof(T).GetProperty(propertyName).PropertyType.ToString();
                    System.Reflection.PropertyInfo prop = typeof(T).GetProperty(propertyName);
                    object value = prop.GetValue(filter);


                    if (propertyType == "System.String")
                    {
                        if (value != null)
                        {
                            if (!String.IsNullOrWhiteSpace(value.ToString()))
                            {
                                source = source.Where(
                                        //string.Format("{0}.Contains(@0)",
                                        string.Format("{0}==@0",
                                        propertyName),
                                        value);
                            }
                        }
                    }

                    if (propertyType == "System.Int32")
                    {
                        if (value != null)
                        {
                            if (Convert.ToInt32(value) != 0)
                            {
                                source = source.Where(
                                        string.Format("{0}==@0",
                                        propertyName),
                                        value);
                            }
                        }
                    }

                    if (propertyType == "System.Boolean")
                    {
                        if (value != null)
                        {
                            source = source.Where(
                                    string.Format("{0}==@0",
                                    propertyName),
                                    value);
                        }
                    }


                }

            });
            return source;
        }

    }
}