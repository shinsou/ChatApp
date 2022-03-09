using Domain.Abstract;

namespace Domain
{
    public class Message : AuditableEntity<string>
    {
        public Message() { }
        public Message(string id) : base(id) { }

        public string Content { get; set; }
        public string LobbyId { get; set; }
    }
}