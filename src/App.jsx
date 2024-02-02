import { useState, useEffect } from "react";
import "./App.css";
import Title from "./Components/Title";
import MainBalance from "./Components/MainBalance";
import ExpenseTracker from "./Components/ExpenseTracker";
import HistoryExpense from "./Components/HistoryExpense";
import InputAddExpense from "./Components/InputAddExpense";

function App() {
  const getLocalStorageIncome = () => {
    let AlreadySavedIncome = localStorage.getItem("savedIncome");

    if (AlreadySavedIncome) {
      console.log(AlreadySavedIncome);
      return (AlreadySavedIncome = JSON.parse(
        localStorage.getItem("savedIncome")
      ));
    } else {
      return "";
    }
  };

  const getLocalStorageExpense = () => {
    let AlreadySavedExpense = localStorage.getItem("savedExpense");
    if (AlreadySavedExpense) {
      return (AlreadySavedExpense = JSON.parse(
        localStorage.getItem("savedExpense")
      ));
    } else {
      return "";
    }
  };
  const getLocalStorageMainBal = () => {
    let AlreadySavedMainBal = localStorage.getItem("savedMainBal");
    if (AlreadySavedMainBal) {
      return (AlreadySavedMainBal = JSON.parse(
        localStorage.getItem("savedMainBal")
      ));
    } else {
      return "";
    }
  };
  const getLocalStorageHistory = () => {
    let AlreadySavedHistory = localStorage.getItem("savedTransactionHistory");
    if (AlreadySavedHistory) {
      return (AlreadySavedHistory = JSON.parse(
        localStorage.getItem("savedTransactionHistory")
      ));
    } else {
      return [];
    }
  };

  const [TotalData, setTotalData] = useState(getLocalStorageHistory());

  const [RadioType, setRadioType] = useState("income");
  const [titleInput, settitleInput] = useState("");
  const [expInput, setexpInput] = useState(0);
  const [Expense, setExpense] = useState(getLocalStorageExpense());
  const [income, setincome] = useState(getLocalStorageIncome());
  const [MainBal, setMainBal] = useState(getLocalStorageMainBal());

  useEffect(() => {
    localStorage.setItem("savedIncome", JSON.stringify(income));
  }, [income]);

  useEffect(() => {
    localStorage.setItem("savedExpense", JSON.stringify(Expense));
  }, [Expense]);

  useEffect(() => {
    localStorage.setItem("savedMainBal", JSON.stringify(MainBal));
  }, [MainBal]);

  useEffect(() => {
    localStorage.setItem("savedTransactionHistory", JSON.stringify(TotalData));
  }, [TotalData]);

  function handleInput(event) {
    setexpInput(event.target.value);
  }
  function handleInputTitle(event) {
    settitleInput(event.target.value);
  }

  function handleRadio(e) {
    setRadioType(e.target.name);
  }

  const handleAdd = () => {
    if (expInput > 0) {
      setTotalData([
        ...TotalData,
        {
          id: TotalData.length,
          RadioType: RadioType,
          Title: titleInput,
          Price: parseFloat(expInput),
        },
      ]);
      setexpInput(0);
      settitleInput("");

      if (RadioType === "income") {
        setMainBal(Number(MainBal) + parseFloat(expInput));
      } else if (RadioType === "expense") {
        setMainBal(Number(MainBal) - parseFloat(expInput));
      } else {
        setMainBal((prev) => {
          return prev;
        });
      }

      if (RadioType === "income") {
        setincome(parseFloat(expInput) + Number(income));
        return Expense;
      } else if (RadioType === "expense") {
        setExpense(parseFloat(expInput) + Number(Expense));
        return income;
      }
    } else {
      console.log("invalid");
    }
  };

  function handleDelete(item) {
    console.log(item);
    setTotalData((prev) => {
      return prev.filter((prevItem, index) => {
        return prevItem.id !== item.id;
      });
    });

    if (item.RadioType === "income") {
      setMainBal(parseFloat(MainBal) - parseFloat(item.Price));
    } else {
      setMainBal((prev) => {
        return prev;
      });
    }

    if (item.RadioType === "expense") {
      setMainBal(parseFloat(MainBal) + parseFloat(item.Price));
    } else {
      setMainBal((prev) => {
        return prev;
      });
    }

    if (item.RadioType === "income") {
      console.log(item.Price);
      let TotalIncome = income - parseFloat(item.Price);
      setincome(TotalIncome);
    } else {
      console.log("must be an income");
    }

    if (item.RadioType === "expense") {
      console.log(item.Price);
      let TotalExpense = Expense - parseFloat(item.Price);
      setExpense(TotalExpense);
    } else {
      console.log("must be an expense");
    }
  }

  return (
    <>
      <Title />
      <MainBalance MainBal={MainBal} />

      <ExpenseTracker
        income={income}
        expInput={expInput}
        handleAdd={handleAdd}
        setExpense={setExpense}
        Expense={Expense}
      />

      <HistoryExpense
        titleInput={titleInput}
        TotalData={TotalData}
        RadioType={RadioType}
        handleDelete={handleDelete}
      />

      <label>Income</label>
      <input
        type="radio"
        onChange={handleRadio}
        checked={RadioType === "income"}
        name="income"
      />

      <input
        type="radio"
        onChange={handleRadio}
        checked={RadioType === "expense"}
        name="expense"
      />
      <label>Expense</label>

      <InputAddExpense
        handleInputTitle={handleInputTitle}
        titleInput={titleInput}
        handleInput={handleInput}
        handleAdd={handleAdd}
        expInput={expInput}
      />
    </>
  );
}
// mainBal will increase by the addition the price of the item removed if it is an expense and will reduce if it is an income  and expense will reduce by the item removed

// adding income(item) will increase mainBal and deleting income(item) will reduce mainBal (both by the item.price)
// adding expense(item) will decrease mainBal and deleting expense(item) will increase mainBal (both by the item.price)
export default App;
