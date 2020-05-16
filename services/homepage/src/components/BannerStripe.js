import React, { useState, useEffect } from "react"
// import { Link } from "gatsby"
import { trackGAEvents } from "./trackGA";
import '../styles/styles.scss';
const hasuraCon = require("../images/hasura-con.svg")
const closeIcon = require("../images/close.svg")
const stripe = require('../images/stripe.png');
const BannerStripe = () => {
  const [showBanner, setShowBanner] = useState(false)
  useEffect(() => {
    if (typeof window !== undefined) {
      if (
        "localStorage" in window &&
        window.localStorage &&
        "getItem" in window.localStorage
      ) {
        const bannerStripeConsent = window.localStorage.getItem("bannerStripeConsent")
        if (bannerStripeConsent !== "yes") {
          updateBannerDisplay()
        }
      }
    }
  })
  const updateBannerDisplay = () => {
    setShowBanner(true)
  }
  const handleBannerClose = () => {
    // update localstorage
    if (typeof window !== undefined) {
      window.localStorage.setItem("bannerStripeConsent", "yes")
      setShowBanner(false)
    }
  }
  if (!showBanner) {
    return null
  }
  return (
    <div className="bannerStripWrapper">
      <div className='container noPadd displayFlex'>
        <a
          href="https://hasura.io/events/hasura-con-2020/"
          target='_blank'
          rel="noopener noreferrer"
          onClick={()=>trackGAEvents("Learn Homepage", "Link Click", "Hasura Con Banner Strip")}
        >
          <div className="bannerStrip">
            <div className="displayFlex noPadd">
              <div className="announceIcon">
                <img
                  className={"img-responsive"}
                  src={hasuraCon}
                  alt={"Hasura Con20"}
                />
              </div>
              <div className="bodyTextSmall">
                <span className="textColor">
                  Announcing our first user conference, Hasura Con’20 >
                </span>
              </div>
            </div>
          </div>
        </a>
        <div
          className="closeBanner"
          onKeyDown={()=>handleBannerClose()}
          role="button"
          tabIndex="0"
          onClick={()=>handleBannerClose()}
        >
          <img className={"img-responsive"} src={closeIcon} alt={"Close"} />
        </div>
      </div>
      <div className='bannerStripImg'>
        <img src={stripe} alt='stripe' />
      </div>
    </div>
  )
}
export default BannerStripe
