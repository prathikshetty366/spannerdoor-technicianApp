import styles from "./QuickSupport.module.scss";
import { quickSupport } from "../../../app/SeedingData";
import { useState } from "react";
import CustomerVoice from "../../customerVoice/CustomerVoice";
import FileUploader from "../../FileUploader/FileUploader";
import AddOns from "../../AddOns/Addons";
import Button from "../../Button/Button";
function QuickSupport({submitService}) {
  const [selectedQuickService, setSelectedQuickService] = useState([]);
  const [rows, setRows] = useState([
    { id: 1, type: 'customerVoice', text: '', priority: 'normal' },
]);
const [selectedFiles, setSelectedFiles] = useState([]);
const [assignedTechnician,setAssignedTechnician]=useState()
const [addOns,setAddOns]=useState([])

  const handleItemSelection = (item) => {
    const isSelected = selectedQuickService.some(
      (selectedItem) => selectedItem.id === item.id
    );

    if (isSelected) {
      // If item is already selected, remove it
      setSelectedQuickService((prevSelected) =>
        prevSelected.filter((selectedItem) => selectedItem.id !== item.id)
      );
    } else {
      // If item is not selected, add it
      setSelectedQuickService((prevSelected) => [...prevSelected, item]);
    }
  };

  const handleUpdateRows = (updatedRows) => {
    setRows(updatedRows);
};

const handleFilesSelect = (files) => {
    setSelectedFiles(files)
};
const handleAddonsSubmit = (selectedAddOns) => {
    console.log('Selected Addons:', selectedAddOns);
    setAddOns(selectedAddOns)
  };

  const handleQuickServiceSubmit=()=>{
    const quickServiceData={
        rows,
        selectedFiles,
        assignedTechnician,
        addOns
    }
    submitService(quickServiceData)

  }
  return (
    <div className={styles.QuickSupportContainer}>
      <div className={styles.QuickSupportWrapper}>
        <h2>QUICK SUPPORT</h2>
        <div className={styles.quickIssues}>
          <div className={styles.title}>SELECT ISSUE MENTIONED</div>
          <div className={styles.itemsWrapper}>
            {quickSupport &&
              quickSupport.map((item) => {
                const isSelected = selectedQuickService.some(
                  (selectedItem) => selectedItem.id === item.id
                );

                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemSelection(item)}
                    className={`${styles.item} ${isSelected ? styles.selected : ""}`}
                  >
                    {item.name}
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles.detailedSummary}>
            <div className={styles.title}>DETAIL ISSUE</div>
            <input/>
        </div>
        <CustomerVoice initialRows={rows} onUpdate={handleUpdateRows} />
        <FileUploader  title="REPAIRED / PART REPLACED / WARRANTY CARD" label="Upload Images" onFilesSelect={handleFilesSelect} />
        <AddOns submitAddons={handleAddonsSubmit}/>
        <div className={styles.technicianAssign}>
                <div className={styles.text}>
                    <label>
                    {/* ASSIGN TECHNICIAN */}
                    <input placeholder='Assign  technician'
                    onChange={(e)=>setAssignedTechnician(e.target.value)}/>
                    </label>
                </div>
                <div className={styles.btnWrapper}>
                    <Button
                        text='Confirm Booking'
                        onClick={handleQuickServiceSubmit} />
                </div>
            </div>
      </div>
    </div>
  );
}

export default QuickSupport;
