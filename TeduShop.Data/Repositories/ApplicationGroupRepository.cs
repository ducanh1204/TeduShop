using System.Collections.Generic;
using System.Linq;
using TeduShop.Data.Infrastructure;
using TeduShop.Model.Models;

namespace TeduShop.Data.Repositories
{
    public interface IApplicationGroupRepository : IRepository<ApplicationGroup>
    {
        IEnumerable<ApplicationGroup> GetListGroupByUserId(string userId);

        IEnumerable<ApplicationUser> GetListUserByGroupId(int groupId);

        IEnumerable<ApplicationGroup> GetListGroupByRoleId(string roleId);
    }

    public class ApplicationGroupRepository : RepositoryBase<ApplicationGroup>, IApplicationGroupRepository
    {
        public ApplicationGroupRepository(IDbFactory dbFactory) : base(dbFactory)
        {
        }

        public IEnumerable<ApplicationGroup> GetListGroupByUserId(string userId)
        {
            var query = from g in DbContext.ApplicationGroups
                        join ug in DbContext.ApplicationUserGroups
                        on g.ID equals ug.GroupId
                        where ug.UserId == userId
                        select g;
            return query;
        }

        public IEnumerable<ApplicationUser> GetListUserByGroupId(int groupId)
        {
            var query = from u in DbContext.Users
                        join ug in DbContext.ApplicationUserGroups
                        on u.Id equals ug.UserId
                        join g in DbContext.ApplicationGroups
                        on ug.GroupId equals g.ID
                        where g.ID == groupId
                        select u;
            return query;
        }

        public IEnumerable<ApplicationGroup> GetListGroupByRoleId(string roleId)
        {
            var query = from g in DbContext.ApplicationGroups
                        join lg in DbContext.ApplicationRoleGroups
                        on g.ID equals lg.GroupId
                        where lg.RoleId == roleId
                        select g;
            return query;
        }

    }
}