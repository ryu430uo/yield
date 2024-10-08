import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import Social from "./Social";
import { ReactComponent as DashboardIcon } from "../../assets/icons/dashboard.svg";
import { ReactComponent as CalculatorIcon } from "../../assets/icons/calculator.svg";
import { ReactComponent as SwapIcon } from "../../assets/icons/swap.svg";
import { ReactComponent as DocsIcon } from "../../assets/icons/docs.svg";

import { shorten } from "../../helpers";
import { useAddress } from "src/hooks/web3Context";
import { Paper, Link, Box, Typography, SvgIcon } from "@material-ui/core";
import LogoImg from "../../assets/images/medusa.png";

function NavContent() {
  const [isActive] = useState();
  const address = useAddress();

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("account") >= 0 && page === "account") {
      return true;
    }
    if (currentPath.indexOf("plsa") >= 0 && page === "plsa") {
      return true;
    }
    if (currentPath.indexOf("calculator") >= 0 && page === "calculator") {
      return true;
    }
    return false;
  }, []);

  return (
    <Paper className="dapp-sidebar">
      <Box
        className="dapp-sidebar-inner"
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        alignItems="flex-start"
      >
        <div className="dapp-menu-top">
          <Box className="branding-header">
            <Link href="">
              <img src={LogoImg} alt="" style={{ width: "250px" }} />
            </Link>
          </Box>
          <Box>
            {address && (
              <div className="dapp-nav">
                <Link href={`https://polygonscan.com/address/${address}`} target="_blank">
                  {shorten(address)}
                </Link>
              </div>
            )}
          </Box>

          <div className="dapp-menu-links">
            <div className="dapp-nav" id="navbarNav">
              <Link
                component={NavLink}
                id="dash-nav"
                to=""
                isActive={(match, location) => {
                  return checkPage(match, location, "dashboard");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={DashboardIcon} />
                  Dashboard
                </Typography>
              </Link>

              <Link
                component={NavLink}
                id="calculator-nav"
                to="calculator"
                isActive={(match, location) => {
                  return checkPage(match, location, "calculator");
                }}
                className={`button-dapp-menu ${isActive ? "active" : ""}`}
              >
                <Typography variant="h6">
                  <SvgIcon color="primary" component={CalculatorIcon} />
                  Calculator
                </Typography>
              </Link>

              <Link href="https://app.uniswap.org/#/swap?chain=polygon" target="_blank">
                <Typography variant="h6">
                  <SvgIcon color="primary" component={SwapIcon} />
                  Swap
                </Typography>
              </Link>

              <Link href="https://medium.com/@medusafinance123/medusa-finance-c6f1dc9a9164" target="_blank">
                <Typography variant="h6">
                  <SvgIcon color="primary" component={DocsIcon} />
                  Docs
                </Typography>
              </Link>
            </div>
          </div>
        </div>
        <Box className="dapp-menu-bottom" display="flex" justifyContent="space-between" flexDirection="column">
          <div className="dapp-menu-social">
            <Social />
          </div>
        </Box>
      </Box>
    </Paper>
  );
}

export default NavContent;
