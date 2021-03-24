using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}





// ! Before I implemented the CQRS pattern and returned queries using EF from controller
// using System;
// using System.Collections.Generic;
// using System.Threading.Tasks;
// using Domain;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using Persistence;

// namespace API.Controllers
// {
//   public class ActivitiesController : BaseApiController
//   {
//     private readonly DataContext _context;
//     public ActivitiesController(DataContext context)
//     {
//       _context = context;
//     }

//     // url/api/activities
//     [HttpGet]
//     public async Task<ActionResult<List<Activity>>> GetActivities()
//     {
//       return await _context.Activities.ToListAsync();
//     }

//     // url/api/activities/{id}
//     [HttpGet("{id}")]
//     public async Task<ActionResult<Activity>> GetActivity(Guid id)
//     {
//       return await _context.Activities.FindAsync(id);
//     }
//   }
// }