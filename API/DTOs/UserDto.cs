namespace API.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
        /*
        TODO: Token will be sent to the client to authenticate
        */
        public string Token { get; set; }
    }
}