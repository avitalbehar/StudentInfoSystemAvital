using System;

namespace AngularApp1.Server.Models
{
    public class Student
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Country { get; set; }
        public string Gender { get; set; }
        public string Class { get; set; }
        public string QuestionnaireStatus { get; set; }
        public string PersonalProgramStatus { get; set; }  
        public string StudentStatus { get; set; }
        public string StudentType { get; set; }
        public string PreviousIdentificationNumber { get; set; }
        public string ImageUrl { get; set; }
    }
}
