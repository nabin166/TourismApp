namespace CommonService
{
    public class DbResponse
    {
        public int ErrorCode { get; set; } = 0; // 0 = success by default
        public string Message { get; set; } = "Success";
        public int? Id { get; set; } // Optional, used for insert/update
    }
}
