// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


interface IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}

contract swapToBOB {
    IUniswapRouter public constant _swapRouter = IUniswapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564); // (to change !!, find the right address on Polygon !!)
    uint24 public constant _poolFee = 3000; //pool fee equals to 0.3%.
    address public constant _tokenOut = 0xB0B195aEFA3650A6908f15CdaC7D92F8a5791B0B; //tbc - BOB erc20 polygon's address 

    event Received(address sender, uint value);


    address _bobAddress = 0x7883cfA8D367c433985fa320B4491489e9D3F6cD;

    

    constructor (address tokenIn) {
        IERC20(tokenIn).approve(address(_bobAddress), type(uint256).max);
    }

    function swapExactInputSingle(address tokenIn, uint amountIn, uint _amountOutMinimum, string calldata zkAddress) external returns (uint amountOut) {
        require(amountIn > 0, "amountIn can't be null");

        // maybe permit 
        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);

        IERC20(tokenIn).approve(address(_swapRouter), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: _tokenOut,
                fee: _poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: _amountOutMinimum, //to be computed by js code. Cf Uniswap doc
                sqrtPriceLimitX96: 0
            });

        amountOut = _swapRouter.exactInputSingle(params);
        _swapRouter.refundETH(); //refund potential remaining eth

        IZkBobDirectDeposits(_bobAddress).directDeposit(msg.sender, amountOut, zkAddress);

    }

    receive() payable external {
        emit Received(msg.sender, msg.value);
    }

}

interface ISwapRouter {
    struct ExactInputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint deadline;
        uint amountIn;
        uint amountOutMinimum;
        uint160 sqrtPriceLimitX96;
    }

    /// @notice Swaps amountIn of one token for as much as possible of another token
    /// @param params The parameters necessary for the swap, encoded as ExactInputSingleParams in calldata
    /// @return amountOut The amount of the received token
    function exactInputSingle(
        ExactInputSingleParams calldata params
    ) external payable returns (uint amountOut);

}

interface IUniswapRouter is ISwapRouter {
    function refundETH() external payable;
}



interface IZkBobDirectDeposits {

    function directDeposit(
        address fallbackReceiver,
        uint256 amount,
        string memory zkAddress
    )
        external
        returns (uint256 depositId);

}