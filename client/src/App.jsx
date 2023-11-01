import { Routes, Route } from "react-router-dom";
import ProtectedAdminRoute from "./protectedRoute/ProtectedAdminRoute";
import {
  AdminSharedLayout, Auth, Panel, AddItem,
  Stats,
  MyItems,
  Write
} from "./adminpanel/export"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Routes >
        <Route
          path="/admin"
          element={<ProtectedAdminRoute>{< AdminSharedLayout />}</ProtectedAdminRoute>}
        >
          <Route index element={<Panel />} />
          <Route path="add_item" element={<AddItem />} />
          <Route path="stats" element={<Stats />} />
          <Route path="my_Item" element={<MyItems />} />
          <Route path="write" element={<Write />} />
        </Route>
        <Route path="/" element={<Auth />} />
        <Route path="*" element={<h1>no page found</h1>} />
      </Routes >
    </>
  )
}

export default App