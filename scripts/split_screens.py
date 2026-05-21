from pathlib import Path
import re

base = Path('src/components/MedApp')
old = base / 'screens.js'
text = old.read_text('utf8')
lines = text.splitlines()
exports = [(m.group(1), i+1) for i,l in enumerate(lines) for m in [re.search(r'^export const (\w+) = \(', l)] if m]
exports.sort(key=lambda x:x[1])

bounds = {}
for idx,(name,line) in enumerate(exports):
    end = len(lines)
    if idx+1 < len(exports):
        end = exports[idx+1][1]-2
    bounds[name] = (line, end)

login_start = next(line for name,line in exports if name=='LoginScreen')
doc_start = next(line for name,line in exports if name=='DoctorAppointmentsScreen')

screens_dir = base / 'screens'
screens_dir.mkdir(parents=True, exist_ok=True)

shared_path = screens_dir / 'shared.js'
shared_lines = lines[:login_start-1] + lines[2026:doc_start-1]
shared_text = '\n'.join(shared_lines).strip() + '\n'
shared_header = 'import { theme } from "../components";\nimport { DEFAULT_VENDOR, matchesProductCategory } from "../api";\n\n'
shared_path.write_text(
    shared_header
    + shared_text
    + '\nexport {\n  vedikaLogoImageSrc,\n  homeCategoryCards,\n  homeOtcCards,\n  homeBabyCards,\n  VedikaLogo,\n  formInputStyle,\n  primaryButtonStyle,\n  stackedActionGridStyle,\n  surfaceCardStyle,\n  mutedTextStyle,\n  getErrorMessage,\n  getSessionPhone,\n  getSessionName,\n  formatCurrency,\n  buildInitialAddressForm,\n  buildInitialProfileForm,\n  buildInitialRetailerForm,\n  createAvatarLabel,\n  getCategoryFromProduct,\n  buildDoctorPortrait,\n  doctorWeekdayShortLabels,\n  doctorWeekdayFullLabels,\n  doctorAppointmentDoctors,\n  getDoctorAppointmentRoute,\n  getDoctorById,\n  normalizeDoctorDate,\n  isSameDoctorDay,\n  findNextDoctorAvailableDate,\n  getDoctorAvailableSlots,\n  getDoctorMonthCells,\n};\n',
    'utf8',
)

index_path = screens_dir / 'index.js'
index_path.write_text('\n'.join([f'export {{ {name} }} from "./{name}";' for name,_ in exports]) + '\n','utf8')

import_header = '''import React, { useEffect, useRef, useState } from "react";
import {
  Icon,
  SectionTitle,
  CategoryCard,
  CollectionPanel,
  HeroStat,
  PageHeader,
  StarRating,
  theme,
  style,
  layout,
  useViewport,
} from "../components";
import {
  DEFAULT_VENDOR,
  addWalletAmount,
  deleteAddress,
  fetchAddresses,
  fetchOrders,
  fetchProducts,
  fetchRetailerDetails,
  fetchUserProfile,
  fetchVendorList,
  fetchVendorUserData,
  loginUser,
  matchesProductCategory,
  pickPreferredVendor,
  saveAddress,
  saveRetailerDetails,
  saveRetailerDetailsWithUrl,
  saveAccountDetails,
  saveWalletDetailsWithUrl,
  searchProducts,
  sendOtp,
  updateUserProfile,
} from "../api";
import { productData, categorySidebarItems, privacySections } from "../data";
import {
  vedikaLogoImageSrc,
  homeCategoryCards,
  homeOtcCards,
  homeBabyCards,
  VedikaLogo,
  formInputStyle,
  primaryButtonStyle,
  stackedActionGridStyle,
  surfaceCardStyle,
  mutedTextStyle,
  getErrorMessage,
  getSessionPhone,
  getSessionName,
  formatCurrency,
  buildInitialAddressForm,
  buildInitialProfileForm,
  buildInitialRetailerForm,
  createAvatarLabel,
  getCategoryFromProduct,
  buildDoctorPortrait,
  doctorWeekdayShortLabels,
  doctorWeekdayFullLabels,
  doctorAppointmentDoctors,
  getDoctorAppointmentRoute,
  getDoctorById,
  normalizeDoctorDate,
  isSameDoctorDay,
  findNextDoctorAvailableDate,
  getDoctorAvailableSlots,
  getDoctorMonthCells,
} from "./shared";
'''

for name,(start,end) in bounds.items():
    block = '\n'.join(lines[start-1:end]).rstrip() + '\n'
    path_out = screens_dir / f'{name}.js'
    if name == 'LegacyLabTestScreen':
        block = '/* eslint-disable no-unused-vars */\n' + block + '/* eslint-enable no-unused-vars */\n'
    path_out.write_text(import_header + '\n' + block, 'utf8')

old.write_text('export * from "./screens/index";\n','utf8')
print(f'Generated {len(bounds)} screen files.')
