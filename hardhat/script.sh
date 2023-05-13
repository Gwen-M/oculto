yarn hardhat run ./scripts/deploy.js

ADDR1=$(cat ../frontend/src/artifacts/SwapAndTransfer_address.json | grep -o '"address": ".*"' | cut -d'"' -f4)

yarn hardhat verify --network polygon ${ADDR1}
# yarn hardhat verify --network optimism ${ADDR1}
# yarn hardhat verify --network scroll ${ADDR1}

cp ./artifacts/contracts/SwapAndTransfer.sol/SwapAndTransfer.json ../frontend/src/artifacts/.