using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    // "AllowAnonymous" allows a user to access account methods without being authenticated -yet.
    // I.E. A user cannot be authenticted -yet- when engaging Auth protocols in AccountController
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    // Although there is a "BaseApiController" we are extending directly from the ConrollerBase
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._tokenService = tokenService;
        }

        // Clean DRY code principles (reusable for this component)
        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                UserName = user.UserName,
                Image = null,
                Token = _tokenService.CreateToken(user)
            };
        }

        //! ("/api/account/login")
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }
            return Unauthorized();
        }

        //! ("/api/account/register")
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("This email has been taken!");
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                return BadRequest("This username has been taken!");
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
               return CreateUserObject(user);
            }
            return BadRequest("There was a problem registering user!");
        }

        //! ("/api/account")
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }
    }
}