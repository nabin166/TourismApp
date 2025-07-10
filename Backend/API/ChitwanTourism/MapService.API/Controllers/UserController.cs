using MapService.Service;
using Microsoft.AspNetCore.Mvc;


namespace MapService.API.Controllers
{
    public class UserController : Controller
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            this._userService = userService;
        }
        #region user
        [HttpGet("GetAllUser")]
        public async Task<IActionResult> GetAllUser()
        {
            return await _userService.GetAllAsync();
        }
        [HttpPost("CreateUpdateUser")]
        public async Task<IActionResult> CreateUpdateUser(UserDto userDto)
        {
            return await _userService.CreateUpdateUserAsync(userDto);
        }
        [HttpPost("DeleteUser")]
        public async Task<IActionResult> DeleteUser(UserDto userDto)
        {
            return await _userService.GetAllAsync(); 
        }
        #endregion user
    }
}
