
using CommonService;
using MapService.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MapService.Service.IServices
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<DbResponse> CreateUpdateUserAsync(User user);
        Task<DbResponse> DeleteUserAsync(int? id);
    }
}
