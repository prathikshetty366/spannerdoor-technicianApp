import { useState } from "react"
import styles from "./service.module.scss"
import Wash from "../packages/wash/Wash"
import QuickSupport from "../packages/QuickSupport/QuickSupport"

function Service({submitService}) {
    const [selectedServiceOption, setSelectedServiceOption] = useState(3)
    return (
        <div className={styles.service}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <div className={styles.numbering}>1</div>
                    <div className={styles.tagline}>Select service</div>
                </div>
            </div>
            <div className={styles.serviceOptions}>
                <div className={styles.optionsWrapper}>
                    <div onClick={()=>setSelectedServiceOption(1)} className={selectedServiceOption === 1 ? styles.optionSelected : styles.option}>QUICK SUPPORT</div>
                    <div onClick={()=>setSelectedServiceOption(2)} className={selectedServiceOption === 2 ? styles.optionSelected : styles.option}>GENERAL SERVICE</div>
                    <div onClick={()=>setSelectedServiceOption(3)} className={selectedServiceOption === 3 ? styles.optionSelected : styles.option}>WASH</div>
                </div>
            </div>
            {selectedServiceOption===3&&(
                <Wash submitService={submitService}/>
            )}
            {selectedServiceOption===1&&(
                <QuickSupport submitService={submitService}/>
            )}
        </div>

    )

}

export default Service