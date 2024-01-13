import React from "react";
import IconSpeakingAvatar from "../../Assets/SVG/IconSpeakingAvatarISN";

export default function GuideLineSpeaking() {
  return (
    <div className="h-full w-full  leading-9">
      <div className="md:w-[85%] sm:w-full px-2 py-2 h-auto  m-auto">
        <div className="bg-[#EBF1F9] px-2 py-2 w-full h-auto flex justify-around ">
          <div className="md:w-[55%] sm:w-full h-full m-auto ">
            <h1
              className="md:text-[40px] sm:text-[22px] font-poppins font-[900] text-[#3AB7BF] w-full h-full
            sm:text-center md:leading-[3rem]"
            >
              Useful Tips for Speaking Section in Duolingo English Test
            </h1>
          </div>

          <div className="w-[35%] mr-[1.5rem] sm:hidden md:block ">
            <span className="self-end flex justify-end">
              <IconSpeakingAvatar
                height="15rem"
                width="15rem"
              ></IconSpeakingAvatar>
            </span>
          </div>
        </div>

        <div className="mt-5 h-auto w-full ml-1 text-[20px] font-montserrat text-justify sm:px-2">
          <div className="font-montserrat text-[20px] px-2">
            <h1 className="md:text-[25px] sm:text-[20px] font-[700] font-poppins underline">
              How to Prepare for Speaking in Duolingo English Test
            </h1>
            <div className="mt-5">
              <h1 className="font-[600]">Speak about the photo</h1>
              <p>
                This is likely one of the trickiest adaptive system questions
                you will face on the Duolingo English Test since it requires you
                to describe a picture in great detail without much preparation.
              </p>

              <div className="mt-3 ml-5">
                <ul className="list-disc">
                  <li>This question will appear once.</li>
                  <li>You have to describe the photo aloud for 90 seconds.</li>
                  <li> You must speak for at least 30 seconds.</li>
                  <li> Speak for as long as possible.</li>
                  <li>
                    {" "}
                    You are scored based on your content, fluency, and
                    pronunciation.
                  </li>
                  <li>
                    {" "}
                    It contributes to your production and conversation
                    subscores.
                  </li>
                </ul>
              </div>
            </div>
            {/*  */}
            <div className="mt-5">
              <h1 className="font-[600]">Read Aloud</h1>
              <p>
                As the name suggests, participants will read aloud from a
                prepared statement into the microphone.
              </p>

              <div className="mt-3 ml-5">
                <ul className="list-disc">
                  <li>Time Limit: 20 seconds</li>
                  <li>
                    Subscores: Comprehension, Conversation In this section, a
                    phrase will show on the screen; you have to record yourself
                    saying the phrase. Your communication skills will be
                    evaluated by this question.
                  </li>
                  <li>This question will appear 3-7 times.</li>
                  <li>You will have to complete this task in 20 seconds.</li>
                  <li>You will then speak for 30 – 90 seconds on the topic.</li>
                  <li> Speak for as long as possible.</li>
                  <li>
                    {" "}
                    It contributes to your production and literacy subscores.
                  </li>
                </ul>
              </div>

              <div className="mt-5">
                <h1 className="font-[600]">
                  {"*"} Tips for answering these questions
                </h1>
                <div className="mt-2 ml-5">
                  <ul className="list-disc">
                    <li>
                      Read it aloud to yourself in silence for the first few
                      seconds.
                    </li>
                    <li>Read the prompt slowly.</li>
                    <li>
                      Make use of punctuation to help you decide when to stop
                      writing.
                    </li>
                    <li>
                      You have only twenty seconds, so keep an eye on the clock.
                    </li>
                    <li>
                      Read the prompt exactly as provided. Don't change, add, or
                      remove any words.
                    </li>
                    <li>
                      {" "}
                      Do not forget that certain words are stressed, including
                      nouns, adverbs, adjectives, and main verbs.
                    </li>
                    <li>
                      {" "}
                      Pronouns, articles, prepositions, and conjunctions are
                      examples of function words that are not stressed.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="mt-5">
              <h1 className="font-[600]">Speak about the topic</h1>
              <p>
                Speak up in response to the questions. You have 30 seconds to
                respond to the question. Complete each question accurately
                because it will be recorded.
              </p>

              <div className="mt-3 ">
                <h1 className="font-[600]">a. Written prompt</h1>
                <div className="ml-5">
                  <ul className="list-disc">
                    <li>The question will show up twice.</li>
                    <li>You have 20 seconds to mentally get ready.</li>
                    <li>
                      After that, you will discuss the subject for 90 seconds.
                    </li>
                    <li>Speak for as long as you can.</li>
                    <li>
                      {" "}
                      Topics: travel, food, your past, culture, hobby, etc.
                    </li>
                    <li>
                      {" "}
                      Your production and conversation subscores benefit from
                      it.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-3 ">
                <h1 className="font-[600]">b. Aural Prompt</h1>
                <div className="ml-5">
                  <ul className="list-disc">
                    <li>The question will show up twice.</li>
                    <li>You have 20 seconds to mentally get ready.</li>
                    <li>
                      After that, you will discuss the subject for 90 seconds.
                    </li>
                    <li> Speak for as long as you can.</li>
                    <li> You can replay the question up to 3x</li>
                    <li>
                      {" "}
                      Topics: travel, food, your past, culture, hobby, etc.
                    </li>
                    <li>
                      Your production and conversation subscores benefit from
                      it.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 text-justify">
                <h1 className="font-[700]">
                  Prompts for "Speak about the topic" questions will fall into
                  one of three categories:
                </h1>
                <div className="ml-3 flex gap-2 flex-col mt-2">
                  <p>Explanatory - describe something in detail</p>
                  <p>Informative - educate the listener on a topic</p>
                  <p>
                    Argumentative - express your opinion on a subject and
                    include reasons to support it Your job is to pretend that
                    the person you are talking to knows nothing about the topic
                    at hand! Then you'll need to teach them all about that topic
                    and/or explain what and why you believe what you do,
                    providing as much detail as possible.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/*  */}

          <div className="mt-10 font-montserrat text-[20px] ">
            <p className="md:text-[25px] sm:text-[20px] font-[700] font-poppins underline">
              How Can You Improve Your Speaking Skills in English?
            </p>
            <div className="mt-3">
              <h1 className="font-[600]">
                Don’t memorise Duolingo English Test answers
              </h1>
              <p>
                For the Duolingo English Test, do not memorize answers.
                Memorized language does not provide an accurate assessment of
                your English-language abilities. If the AI marking system
                detects that you have memorized your answers, you will be
                disqualified.
              </p>
            </div>
            <div className="mt-3">
              <h1 className="font-[600]">Avoid using unfamiliar words</h1>
              <p>
                You might want to use big and complex words in your speaking
                responses to sound more formal. To be on the safe side, avoid
                using words you are not familiar with. You are more likely to
                make mistakes with unfamiliar words, either by mispronouncing
                them or using them incorrectly in your sentences. Vocabulary
                errors will affect your overall score.<br></br> <br></br>{" "}
                Instead, use vocabulary that you are comfortable with and that
                is relevant to the topic.
              </p>
            </div>

            <div className="mt-5">
              <h1 className="font-[700]">
                Use a range of grammatical structures
              </h1>
              <p>
                When Duolingo assess your speaking skills, they use the
                following assessment criteria:
              </p>

              <div className="mt-3 ml-2">
                <ul className="list-disc ml-5">
                  <li>
                    the correctness of your grammar (grammatical accuracy)
                  </li>
                  <li>
                    {" "}
                    the variety and level of your grammar (grammatical
                    complexity)
                  </li>
                  <li>the level of vocabulary used (lexical sophistication)</li>
                  <li>the variety of word choice (lexical diversity)</li>
                  <li>
                    how well you answer the question that was asked (task
                    relevance)
                  </li>
                  <li>
                    how much you can say or write in a limited time (fluency)
                  </li>
                  <li>the pronunciation and pace (acoustic features)</li>
                </ul>
              </div>
              <p className="mt-3">
                To achieve a high score, use a variety of grammatical structures
                in complex and simple sentences. In addition, you will be
                evaluated on your ability to use different grammatical
                structures correctly, so practice speaking about the past,
                present, and future using correct tenses.
              </p>
            </div>
          </div>

          {/*  */}
          <div className="mt-5">
            <h1 className="font-[700]">Don’t worry about your accent</h1>
            <p>
              If you can communicate well, then you do not need to worry about
              your accent. But do be aware of the English sounds that you have
              difficulty with and make sure to use English pronunciation
              features like stress and intonation.
            </p>
          </div>
          {/*  */}
          <div className="mt-5">
            <h1 className="font-[700]">Avoid using fillers</h1>
            <p>
              Speak with confidence and avoid filler words. When we don't know
              what to say, we usually use fillers; however, this shows Duolingo
              that you can't access the appropriate language or ideas, so it's
              important to avoid using them as much as possible. Avoid using the
              following fillers too frequently:
            </p>
            <ul className="mt-3 list-disc ml-5">
              <li>Like</li>
              <li>You know</li>
              <li> Umm…</li>
              <li>Ahh..</li>
              <li> Ehh…</li>
              <li> Well</li>
              <li>Yeah..</li>
            </ul>
          </div>

          {/*  */}
          <div className="mt-5">
            <h1 className="font-[700]">Extend your answers</h1>
            <p>
              Usually, there are two or three questions within each speaking
              prompt, so try to answer the prompts completely. Extend your
              responses by providing examples and/or explanations for your
              ideas. Short answers indicate to Duolingo that you are unable to
              discuss a topic in depth. <br></br> Practice common Duolingo
              English Test topics The Read, Then Speak and Listen, Then Speak
              questions on the test require you to speak on a topic for 30 to 90
              seconds. Practice common Duolingo English Test topics on our
              practice platform to become familiar with the types of prompts you
              will get on the test. Common topics you can practice for the
              speaking question types include:
            </p>
            <ul className="mt-3 list-disc ml-5">
              <li>Tourism and travel</li>
              <li>Education</li>
              <li>Transport</li>
              <li> Environment</li>
              <li> Family life</li>
              <li> Sport and recreation</li>
              <li>Crime and punishment</li>
              <li>The internet</li>
              <li>Advertising and retail</li>
            </ul>
          </div>
         
        </div>
        <hr className='h-5 mt-5'></hr>
      </div>
    </div>
  );
}
