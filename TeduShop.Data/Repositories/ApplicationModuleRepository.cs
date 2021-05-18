using System.Collections.Generic;
using System.Linq;
using TeduShop.Data.Infrastructure;
using TeduShop.Model.Models;

namespace TeduShop.Data.Repositories
{
    public interface IApplicationModuleRepository : IRepository<ApplicationModule>
    {
        IEnumerable<ApplicationModule> GetAllModule();
    }

    public class ApplicationModuleRepository : RepositoryBase<ApplicationModule>, IApplicationModuleRepository
    {
        public ApplicationModuleRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }
        public IEnumerable<ApplicationModule> GetAllModule()
        {
            var query = from m in DbContext.ApplicationModules
                        select m;

            return query.GroupBy(p => new { p.ID, p.Name }).Select(g => g.FirstOrDefault());
        }
    }
}