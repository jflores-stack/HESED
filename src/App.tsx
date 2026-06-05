/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Landing from './pages/Landing';
import Login from './pages/Login';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Volunteers from './pages/admin/Volunteers';
import Kids from './pages/admin/Kids';
import Attendance from './pages/admin/Attendance';
import Donations from './pages/admin/Donations';
import BlogAdmin from './pages/admin/BlogAdmin';
import BlogList from './pages/BlogList';
import BlogPostView from './pages/BlogPostView';
import SiteEditor from './pages/admin/SiteEditor';
import EnrollmentForm from './pages/EnrollmentForm';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/inscripcion" element={<EnrollmentForm />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogPostView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="volunteers" element={<Volunteers />} />
              <Route path="kids" element={<Kids />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="donations" element={<Donations />} />
              <Route path="blog" element={<BlogAdmin />} />
              <Route path="editor" element={<SiteEditor />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}
