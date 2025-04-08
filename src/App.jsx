import { useState } from "react";
import axios from "axios";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const App = () => {
  const [spam, setSpam] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const subject = formData.get("subject");
    let body = formData.get("body");

    body = "Subject: " + subject + "\n" + body;

    console.log(body);

    try {
      const { data } = await axios.post("http://localhost:8001/predict", {
        email_text: body,
      });
      setLoaded(true);
      setSpam(data.is_spam);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setLoaded(false);
  };

  const [text] = useTypewriter({
    words: ["email spam.", "email hợp lệ."],
    loop: Infinity,
    deleteSpeed: 80,
    delaySpeed: 3000,
  });

  return (
    <div className='h-full w-full bg-[#0D1117] py-10 px-12 md:px-24 lg:px-32'>
      <div className='flex flex-col items-center w-full h-full'>
        {/* <div className='px-8 py-2.5 font-light bg-[#161B22] text-[10px] md:text-[12px] lg:text-[14px] text-[#EEEEEE] rounded-full'>
          Powered by Devently Team
        </div> */}
        <p className='text-white text-center align-middle text-[28px] md:text-[42px] lg:text-[64px] font-bold mt-2'>
          PHÂN LOẠI EMAIL
        </p>
        {/* <p className='text-[#848D97] text-[12px] md:text-[14px] lg:text-[18px] font-medium text-center'>
          Say goodbye to unwanted messages cluttering your inbox – let our
          powerful model help you filter out the noise and prioritize important
          emails.
        </p> */}
        <div className='flex flex-col ite lg:flex-row w-full h-full mt-4 md:mt-12 lg:mt-16'>
          <div className='flex flex-col text-[24px] md:text-[36px] lg:text-[54px] w-full h-full mt-4'>
            <p className='text-white font-bold'>Xin chào,</p>
            <p className='text-white font-bold'>
              Tôi nghĩ đây là
              <br />
              <span className='text-blue-500 font-bold'>{text}</span>
              <Cursor cursorColor='white' />
            </p>
          </div>
          <div className='w-full'>
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <p className='text-white font-semibold text-[16px] lg:text-[20px] max-lg:mt-12'>
                Cách dùng
              </p>
              <p className='text-[#848D97] font-medium text-[12px] md:text-[14px] lg:text-[16px] mt-4'>
                Chỉ cần dán/nhập nội dung của email bạn muốn phân tích <br/> ở dưới và nhấn nút "Dự đoán".
              </p>
              <input
                type='text'
                id='subject'
                name='subject'
                required
                placeholder='Tiêu đề'
                className='w-full bg-slate-800 focus:outline-none font-medium text-gray-100 rounded-lg px-8 py-4 mt-6'
              />
              <textarea
                name='body'
                id='body'
                rows='4'
                required
                placeholder='Nhập nội dung email...'
                className='w-full bg-slate-800 focus:outline-none font-medium text-gray-100 rounded-lg px-8 py-4 mt-6'
              ></textarea>
              <div className='flex flex-row w-full items-center mt-4 gap-16'>
                <div className='flex-grow'>
                  <button className='before:ease relative h-12 w-40 overflow-hidden border border-blue-500 text-blue-500 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-blue-500 before:duration-300 hover:text-white hover:shadow-blue-500 hover:before:h-64 hover:before:-translate-y-32 font-semibold rounded-md border-2'>
                    <span class="relative z-10">Dự đoán</span>
                  </button>
                </div>

                {loaded ? (
                  spam ? (
                    <p className='text-red-500 text-[16px] font-medium flex'>
                      Email này có thể là spam!
                    </p>
                  ) : (
                    <p className='text-green-500 text-[16px] font-medium flex'>
                      Email này là email hợp lệ!
                    </p>
                  )
                ) : null}
              </div>
            </form>
          </div>
        </div>
        <Cursor />
      </div>
    </div>
  );
};

export default App;
