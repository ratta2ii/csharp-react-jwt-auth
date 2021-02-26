using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {

      public MappingProfiles()
      {
          // Args (mapFromWhere, mapToHere) -AutoMapper in csproj and StartUp class
          CreateMap<Activity, Activity>();
      }
        
    }
}