# hyperism

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Solidity Lint github action](https://github.com/hyperism/hyperism/actions/workflows/lint_solidity.yml/badge.svg?branch=main)
![Smart Contract Unit testing github action](https://github.com/hyperism/hyperism/actions/workflows/test_smartcontract.yml/badge.svg?branch=main)
![DApp Unit testing github action](https://github.com/hyperism/hyperism/actions/workflows/test_dapp.yml/badge.svg?branch=main)

Ethereum NFT trading system for GLSL Shader code gadget and visualization

# Quick Overview (Four terminals needed for monitoring all activities. Or just execute with '&' to run as background task)
```bash
git clone --recursive https://github.com/Hyperism/hyperism.git
cd hyperism

# Run local standalong ethereum blockchain code and console
npm install
# At terminal 1
npx hardhat node
# At terminal 2
truffle console

# Run backend server through docker-compose
# At terminal 3
cd server && docker-compose up --force-recreate

# Run web application
# At terminal 4
cd app
yarn install
yarn react-app:start
```

## Contact

You can contact me via e-mail (sinjihng at gmail.com). I am always happy to answer questions or help with any issues you might have, and please be sure to share any additional work or your creations with me, I love seeing what other people are making.

## License
<img align="right" src="http://opensource.org/trademarks/opensource/OSI-Approved-License-100x137.png">

The class is licensed under the [MIT License](http://opensource.org/licenses/MIT):

Copyright (c) 2022 Team Hyperism
*   [Jihong Shin](https://github.com/Snowapril)
*   [Hyungeun Lee](https://github.com/leehyunk6310)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
