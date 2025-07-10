using CommonService;
using MapService.Domain;
using MapService.Repository.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MapService.Repository
{
    internal class UserRepo : IUserRepo
    {
        public Task<DbResponse> CreateUpdateUserAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<DbResponse> DeleteUserAsync(int? id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
