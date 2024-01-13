import React from "react";
import IconListeningAvatar from "../../Assets/SVG/IconListeningAvatar";

export default function GuideLineListening() {
  return (
    <div className="h-full w-full  leading-9">
      <div className="md:w-[85%] sm:w-full px-2 py-2 h-auto  m-auto">
        <div className="bg-[#EBF1F9] px-2 py-2 w-full h-auto flex justify-around ">
          <div className="md:w-[55%] sm:w-full h-full m-auto ">
            <h1
              className="md:text-[40px] sm:text-[22px] font-poppins font-[900] text-[#3AB7BF] w-full h-full
            sm:text-center md:leading-[3rem]"
            >
              Useful Tips for Listening Section in Duolingo English Test
            </h1>
          </div>

          <div className="w-[35%] mr-[1.5rem] sm:hidden md:block ">
            <span className="self-end flex justify-end">
              <IconListeningAvatar
                height="15rem"
                width="15rem"
              ></IconListeningAvatar>
            </span>
          </div>
        </div>

        <div className="mt-5 h-auto w-full ml-1 text-[20px] font-montserrat text-justify sm:px-2">
          <div className="font-montserrat text-[20px] px-2">
            <h1 className="md:text-[25px] sm:text-[20px] font-[700] font-poppins underline">
              How to Prepare for Listening in Duolingo English Test
            </h1>
            <div className="mt-5">
              <h1 className="font-[600]">Some tips for Listen then select</h1>

              <div className="mt-2 ml-5">
                <ul className="list-disc">
                  <li>
                    Take note of each word's unique syllables; some made-up
                    terms might sound very different from the real thing.
                  </li>
                  <li>Only use sentences that you are confident are true.</li>
                  <li>
                    Make sure you have checked your chosen terms twice before
                    pressing the NEXT button.
                  </li>
                  <li>You can repeat each sentence as often as you like.</li>
                  <li>
                    Simply click the speaker icon next to the words to hear them
                    again.
                  </li>
                  <li>
                    To indicate that you think a phrase is a real English term
                    (), check the orange box ().
                  </li>
                  <li>Your selections will be highlighted in orange.</li>
                  <li>
                    To deselect a word, click the checkbox once more if you have
                    second thoughts.
                  </li>
                </ul>
              </div>
            </div>
            {/*  */}
            <div className="mt-5">
              <h1 className="font-[600]">Some tips for Listen then type</h1>

              <div className="mt-2 ml-5">
                <ul className="list-disc">
                  <li>Write down whatever you hear to start.</li>
                  <li>
                    Compare your feelings with what you wrote after that by
                    reading the passage again.
                  </li>
                  <li>
                    By selecting the orange speaker button, you can play the
                    message up to twice (for a total of three times).
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5">
              <h1 className="font-[600]">Some tips for Listen then speak</h1>

              <div className="mt-2 ml-5">
                <ul className="list-disc">
                  <li>
                    {" "}
                    Instead of just labeling an image, attempt to include a
                    thorough explanation.
                  </li>
                  <li>
                    {" "}
                    Though the guidelines only permit one, make an effort to
                    write multiple complete statements.
                  </li>
                  <li>
                    You will be able to see the image as you type your comment.
                  </li>
                  <li>
                    If you want to go back and review your grammar or spelling,
                    you can use your mouse or touchpad to scroll back into your
                    comment.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/*  */}

          <div className="mt-10 font-montserrat text-[20px] ">
            <p className="md:text-[25px] sm:text-[20px] font-[700] font-poppins underline">
              How Can You Improve Your Listening Skills in English?
            </p>

            <div className="mt-5">
              <h1 className="font-[700]">
                Want to improve your listening “successfully”?
              </h1>
              <h1>If you do these two things, your success is guaranteed:</h1>
              <ul className="mt-3">
                <li>1. Listen to a lot of English every day.</li>
                <li>2. Do it for a long period of time.</li>
              </ul>

              <h1 className="mt-3">
                Let me share a few notes to overcome this problem.
              </h1>
              <div className="mt-3">
                <h1 className="font-[700]">
                  1.Make Sure Your Phone Always Has English Listening Material
                </h1>
                <p>
                  First, you need to download a lot of English listening
                  material to your phone. This way, you can listen to English no
                  matter where you are. Podcasts are free English conversations
                  available for download on your phone. To download, search for
                  a good-rated podcast app in the app store.
                </p>
              </div>

              <div className="mt-3">
                <h1 className="font-[700]">
                  2.Turn Boring Time into Listening Time
                </h1>
                <div className="ml-2">
                  <ul className="ml-3 list-disc">
                    <li> Driving.</li>
                    <li>Riding a bus/train.</li>
                    <li>Doing house chores (washing dishes, cooking, etc.)</li>
                    <li>Working out.</li>
                    <li>Waiting for something.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-3 leading-9">
                <h1 className="font-[700]">3.Make It Fun & Entertaining</h1>
                <p>
                  Engaging activities like gaming, internet surfing, and
                  gambling can enhance listening skills without forcing oneself.
                  To make listening to English enjoyable, consider creating
                  engaging activities that are enjoyable and addictive.re.
                </p>

                <div className='mt-2 ml-2'>
                  <ul className="ml-3 list-disc">
                    <li>Subscribe to Entertaining Channels on YouTube</li>
                    <li>Binge-Watch Popular Television Series & Movies
</li>
                  </ul>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="h-5 mt-5"></hr>
      </div>
    </div>
  );
}
