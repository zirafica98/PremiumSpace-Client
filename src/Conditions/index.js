import React from 'react'
import Price from '../Price'
import { useTranslation } from "react-i18next";

function Conditions() {
  const { t } = useTranslation();
  return (
    <div className='container conditions'>
        <header><h3>{t("cond-title-main")}</h3></header>
        <div className='subtitle'>
            <h5>I {t("cond-title-1")}</h5>
        </div>
        <p>{t("cond-text-1")}</p>
        <p>{t("cond-text-2")}</p>
        <p>{t("cond-text-3")}</p>
        <p>{t("cond-text-4")}</p>
        <p>{t("cond-text-5")}</p>
        <p>{t("cond-text-6")}</p>
        <p>{t("cond-text-7")}</p>
        <p>{t("cond-text-8")}</p>
        <div className='subtitle'>
            <h5>II {t("cond-title-2")}</h5>
        </div>
        <p>{t("cond-text-9")}
            <ul>
                <li>{t("cond-text-9-li-1")}</li>
                <li>{t("cond-text-9-li-2")}</li>
                <li>{t("cond-text-9-li-3")}</li>
                <li>{t("cond-text-9-li-4")}</li>
                <li>{t("cond-text-9-li-5")}</li>
                <li>{t("cond-text-9-li-6")}</li>
                <li>{t("cond-text-9-li-7")}</li>
                <li>{t("cond-text-9-li-8")}</li>
                <li>{t("cond-text-9-li-9")}</li>
                <li>{t("cond-text-9-li-10")}</li>
                <li>{t("cond-text-9-li-11")}</li>
            </ul>
            <p>{t("cond-text-10")}</p>
            <ul>
                <li>{t("cond-text-10-li-1")}</li>
                <li>{t("cond-text-10-li-2")}</li>
                <li>{t("cond-text-10-li-3")}</li>
            </ul>
       </p>
        <div className='subtitle'>
            <h5>III {t("cond-title-3")}</h5>
        </div>
        <p>{t("cond-text-11")}</p>
        <p>{t("cond-text-12")}</p>
        <p>{t("cond-text-13")}</p>
        <p>{t("cond-text-14")}</p>

        <div className='subtitle'>
            <h5>IV {t("cond-title-4")}</h5>
        </div>
        <p>{t("cond-text-15")}
            <ul>
                <li>{t("cond-text-15-li-1")}</li>
                <li>{t("cond-text-15-li-2")}</li>
                <li>{t("cond-text-15-li-3")}</li>
                <li>{t("cond-text-15-li-4")}</li>
                <li>{t("cond-text-15-li-5")}</li>
                <li>{t("cond-text-15-li-6")}</li>
                <li>{t("cond-text-15-li-7")}</li>
                <li>{t("cond-text-15-li-8")}</li>
            </ul>
        </p>
        <div className='subtitle'>
            <h5>V {t("cond-title-5")}</h5>
        </div>
        <p>{t("cond-text-16")}</p>
        <p>{t("cond-text-17")}</p>
        <p>{t("cond-text-18")}</p>

        <div className='subtitle'>
            <h5>VI {t("cond-title-6")}</h5>
        </div>
        <p>{t("cond-text-19")}</p>
        <p>{t("cond-text-20")}</p>
        <p>{t("cond-text-21")}</p>
        <p>{t("cond-text-22")}</p>
        <p>{t("cond-text-23")}</p>
        <p>{t("cond-text-24")}</p>
        <p>{t("cond-text-25")}</p>
        <p>{t("cond-text-26")}</p>
        <p>{t("cond-text-27")}</p>
        <p>{t("cond-text-28")}</p>
        <div className='subtitle'>
            <h5>VII {t("cond-title-7")}</h5>
        </div>
        <p>{t("cond-text-29")}</p>
        <p>{t("cond-text-30")}</p>
        <p>{t("cond-text-31")}</p>
        <p>{t("cond-text-32")}</p>

        <div className='subtitle'>
            <h5>VIII {t("cond-title-8")}</h5>
        </div>
        <p>{t("cond-text-33")}</p>
        <div className='subtitle'>
            <h5>IX {t("cond-title-9")}</h5>
            <Price></Price>
        </div>
    </div>
  )
}

export default Conditions
