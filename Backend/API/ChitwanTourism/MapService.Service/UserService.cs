
using CommonService;
using MapService.DTO;
using MapService.Repository.IRepositories;
using MapService.Service.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace MapService.Service 
{
    public class UserService : IUserService
    {
        private readonly IUserRepo _userRepo;

        public UserService(IUserRepo userRepo) {
            this._userRepo = userRepo;
        }    
        public async Task<DbResponse> CreateUpdateUserAsync(User user)
        {
           return await _userRepo.CreateUpdateUserAsync(user);
        }

        public async Task<DbResponse> DeleteUserAsync(User user)
        {
            return await _userRepo.CreateUpdateUserAsync(user);
        }

        public Task<IEnumerable<User>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
