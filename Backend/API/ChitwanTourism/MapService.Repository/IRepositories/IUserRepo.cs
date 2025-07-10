using CommonService;
using MapService.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MapService.Repository.IRepositories
{
    public interface IUserRepo
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<DbResponse> CreateUpdateUserAsync(User user);
        Task<DbResponse> DeleteUserAsync(int? id);
    }
}
