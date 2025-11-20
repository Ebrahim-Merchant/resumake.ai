> [!NOTE]
> Resumake is currently undergoing a major v3 rewrite. For any thing related to the current app, please see [v2-(old)](https://github.com/saadq/resumake.io/tree/v2-(old)).

# resumake.io

A website for automatically generating elegant LaTeX resumes without the need to write any TeX code yourself.

![resumake](https://i.imgur.com/QUoFVmG.png)

Simply choose a template, fill in as much (or as little) info as you want, and then press <kbd>Make</kbd> to see your output. You can change your template at any point to see how your resume looks with different designs.

When you're happy with your result, you can download the resume as a PDF, TeX, or JSON document. The JSON output is compatible with [JSONResume](https://jsonresume.org).

## ✨ AI-Powered Features

Resumake now includes AI-powered resume improvement features:

- **📈 Improve with AI**: Automatically enhance your resume with stronger action verbs, impact-focused outcomes, and better clarity
- **🎯 Tailor to Job Description**: Customize your resume for a specific job by emphasizing relevant skills and experience

### Setup for AI Features

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env.local` file in the project root:
   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```
3. Build and run the application

For detailed documentation, see [docs/ai-resume-improvement.md](docs/ai-resume-improvement.md).

## Credits
Thanks very much to the creators of the LaTeX templates used in this website.

* [Rensselaer Career Development Center](https://www.rpi.edu/dept/arc/training/latex/resumes/)
* [Byungjin Park](https://github.com/posquit0)
* [Scott Clark](https://github.com/sc932)
* [Debarghya Das](https://github.com/deedy)
* [Xavier Danaux](https://github.com/xdanaux)
* [Ratul Saha](https://github.com/RatulSaha)
* [Daniil Belyakov](https://github.com/dnl-blkv)
* [Frits Wenneker](https://www.overleaf.com/latex/templates/your-new-cv/xqzhcmqkqrtw)

## License
MIT © Saad Quadri
