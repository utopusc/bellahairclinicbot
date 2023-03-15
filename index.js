require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', () => {
  console.log('The bot is online!');
});

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.channel.id !== process.env.CHANNEL_ID) return;
  if (message.content.startsWith('!')) return;

  let conversationLog = [
    { role: 'system', content: 'Hello! Im BellaHair Clinic chatbot. How can I assist you today? Are you looking to learn more about the clinic, or would you like to schedule an appointment? If you have any questions, feel free to ask!'},
    { role: 'system', content: 'When you write an introductory sentence, write an introductory article about our Clinic.'},
    { role: 'system', content: 'What is hair transplantation?:Answer: Hair transplantation is a surgical procedure performed to restore hair in individuals experiencing hair loss.'},
    { role: 'system', content: 'What methods are used for hair transplantation? Answer: Methods such as FUE (Follicular Unit Extraction) and FUT (Follicular Unit Transplantation) are used for hair transplantation.'},
    { role: 'system', content: 'What is the difference between FUE and FUT methods? Answer: FUE method involves the extraction and transplantation of individual hair follicles. FUT method involves the extraction and transplantation of hair follicles in a strip.'},
    { role: 'system', content: 'In which cases can hair transplantation be performed? Answer: Hair transplantation can be performed in cases such as androgenetic alopecia, trauma, burns or other types of hair loss.'},
    { role: 'system', content: 'How long does a hair transplantation procedure take? Answer: Hair transplantation procedure usually takes between 4-8 hours.'},
    { role: 'system', content: 'Is anesthesia used during a hair transplantation procedure? Answer: Yes, local anesthesia is applied during a hair transplantation procedure.'},
    { role: 'system', content: 'Is a hair transplantation procedure painful? Answer: Generally, minimal pain is felt during a hair transplantation procedure.'},
    { role: 'system', content: 'Is there an age limit for hair transplantation? Answer: There is no age limit for hair transplantation.'},
    { role: 'system', content: 'Who is not suitable for a hair transplantation procedure? Answer: Individuals with health problems, bleeding disorders or allergies to hair transplantation are not suitable for the procedure.'},
    { role: 'system', content: 'How long does the recovery process take after a hair transplant procedure? Answer: The recovery process after a hair transplant procedure typically takes 2-3 weeks.'},
    { role: 'system', content: 'How long after a hair transplant procedure can one return to normal life? Answer: One can usually return to normal life 2-3 days after a hair transplant procedure.'},
    { role: 'system', content: 'How long after a hair transplant procedure is it possible to swim or exercise? Answer: Swimming and exercise should be avoided for 2-3 weeks after a hair transplant procedure.'},
    { role: 'system', content: 'How long does it take for hair to grow after a hair transplant procedure? Answer: Hair typically starts to grow 3-4 months after a hair transplant procedure.'},
    { role: 'system', content: 'How many sessions are needed for a hair transplant? Answer: The number of sessions needed for a hair transplant depends on the degree of hair loss and the hair transplant goals of the individual. Generally, 1-2 sessions may be sufficient.'},
    { role: 'system', content: 'How should hair be cared for after a hair transplant procedure? Answer: Hair should be carefully cared for after a hair transplant procedure. Hair should be washed and combed according to the doctors instructions. Care should be taken in the first few weeks to prevent damage to the hair.'},
    { role: 'system', content: 'Is temporary hair loss experienced after a hair transplant procedure? Answer: Temporary hair loss may be experienced after a hair transplant procedure. However, this is a normal process for hair to regrow.'},
    { role: 'system', content: 'Is it possible for hair to look natural after a hair transplant procedure? Answer: It is possible to achieve natural-looking results after a hair transplant procedure. However, this may vary depending on the individuals degree of hair loss and hair structure.'},
    { role: 'system', content: 'How much does a hair transplant procedure cost? Answer: How much does a hair October procedure cost? Answer: It varies between 1950 euros and 2850 euros Dec'},
    { role: 'system', content: 'What are the possible risks after a hair transplant procedure? Answer: Possible risks after a hair transplant procedure include infection, bleeding, swelling, death of hair follicles, and allergic reactions.'},
    { role: 'system', content: 'Which doctors should be preferred for hair transplantation? Answer: Doctors who specialize in hair transplantation and have experience in this field should be preferred for hair transplantation procedures.'},
    { role: 'system', content: 'How long does the recovery process take after hair transplantation? Answer: The recovery process after hair transplantation varies from person to person. Generally, the recovery process is completed within 2-4 weeks.'},
    { role: 'system', content: 'How long does the hair transplantation procedure take? Answer: The hair transplantation procedure can vary depending on the persons hair transplantation needs and hair structure. Generally, it can take 6-8 hours.'},
    { role: 'system', content: 'Is the hair transplantation procedure painful? Answer: The hair transplantation procedure is performed under local anesthesia and is generally painless. However, mild pain may occur after the procedure.'},
    { role: 'system', content: 'How long after hair transplantation can one return to work? Answer: The length of time it takes to return to work after hair transplantation can vary depending on the type of work and the persons recovery process. Generally, one can return to work within 3-7 days.'},
    { role: 'system', content: 'When can the results of hair transplantation be seen? Answer: The results of hair transplantation can begin to be seen within the first 3-4 months. However, it may take 8-12 months for the full results to appear.'},
    { role: 'system', content: 'Is it possible to exercise after hair transplantation? Answer: Exercise can be done after hair transplantation according to the doctors instructions. However, it may be necessary to avoid heavy exercises for the first few weeks.'},
    { role: 'system', content: 'How long does it take for hair to grow after hair transplantation? Answer: The growth process of hair after hair transplantation varies from person to person. Generally, hair begins to grow noticeably within 3-6 months.'},
    { role: 'system', content: 'Can hair be combed after hair transplantation? Answer: Hair can be combed after hair transplantation according to the doctors instructions. However, for the first few weeks, care should be taken not to damage the hair.'},
    { role: 'system', content: 'What kind of doctors should be preferred for hair transplant procedure? Answer: Doctors who specialize in hair transplant and have experience in this field should be preferred for hair transplant procedure.'},
    { role: 'system', content: 'How long does the recovery process take after hair transplant procedure? Answer: The recovery process after hair transplant procedure varies from person to person. Generally, the recovery process is completed within 2-4 weeks.'},
    { role: 'system', content: 'How long does the hair transplant procedure take? Answer: The duration of the hair transplant procedure can vary depending on the persons hair transplant needs and hair structure. Generally, it can take 6-8 hours.'},
    { role: 'system', content: 'Is the hair transplant procedure painful? Answer: The hair transplant procedure is performed under local anesthesia and is generally painless. However, mild pain may occur after the procedure.'},
    { role: 'system', content: 'How long after the hair transplant procedure can one return to work? Answer: The length of time it takes to return to work after the hair transplant procedure can vary depending on the type of work and the persons recovery process. Generally, one can return to work within 3-7 days.'},
    { role: 'system', content: 'When can the results of hair transplant be seen? Answer: The results of hair transplant can start to be seen within the first 3-4 months. However, it may take 8-12 months for the full results to appear.'},
    { role: 'system', content: 'Is it possible to exercise after the hair transplant procedure? Answer: Exercise can be done after the hair transplant procedure according to the doctors instructions. However, avoiding heavy exercise may be necessary for the first few weeks.'},
    { role: 'system', content: 'How long does it take for the hair to grow after the hair transplant procedure? Answer: The length of time it takes for the hair to grow after the hair transplant procedure varies from person to person. Generally, the hair starts to grow noticeably within 3-6 months.'},
    { role: 'system', content: 'When can the hair be washed after the hair transplant procedure? Answer: The hair can generally be washed 2-3 days after the hair transplant procedure. However, it is important to follow the doctors instructions.'},
    { role: 'system', content: 'Can the hair be combed after the hair transplant procedure? Answer: The hair can be combed after the hair transplant procedure according to the doctors instructions. However, it is important to be careful for the first few weeks to prevent any damage to the hair.'},
    { role: 'system', content: 'How long does it take for hair to grow after a hair transplant? Answer: The length of time it takes for hair to grow after a hair transplant can vary depending on a persons hair type and body characteristics. However, generally it takes 6 to 12 months for the hair to fully grow.'},
    { role: 'system', content: 'When is it possible to style hair after a hair transplant? Answer: Styling hair after a hair transplant should be limited for the first few weeks following the procedure, following the doctors instructions. However, once the hair has fully healed and new hair has grown, styling will be possible.'},
    { role: 'system', content: 'what number can I contact you at?  Answer: to us +90 535 685 83 93 you can reach from this number'},

];

  try {
    await message.channel.sendTyping();

    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
      if (message.content.startsWith('!')) return;
      if (msg.author.id !== client.user.id && message.author.bot) return;
      if (msg.author.id !== message.author.id) return;

      conversationLog.push({
        role: 'user',
        content: msg.content,
      });
    });

    const result = await openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
        temperature:0.2,
        max_tokens:600,
        top_p:1,
        frequency_penalty:0.5,
        presence_penalty:0.5
      })
      .catch((error) => {
        console.log(`OPENAI ERR: ${error}`);
      });

    message.reply(result.data.choices[0].message);
  } catch (error) {
    console.log(`ERR: ${error}`);
  }
});

client.login(process.env.TOKEN);
