/**
 * InlineMessage Component
 * 
 * Purpose: Toast/notification message display for errors, warnings, and info messages
 * 
 * Props:
 *   - tone: Message type - 'error', 'warning', or 'success'
 *   - children: Message text/content to display
 * 
 * Styling:
 *   - Error: Red background with error icon
 *   - Warning: Orange/yellow background
 *   - Success: Green background
 */

import React from "react";
import { theme } from "../../constants/theme.js";
import { Icon } from "../Icon.js";

const toneStyles = {
  error: {
    background: "#fee2e2",
    borderLeft: `4px solid ${theme.red}`,
    color: theme.red,
    icon: "error",
  },
  warning: {
    background: "#fef3c7",
    borderLeft: `4px solid #f59e0b`,
    color: "#b45309",
    icon: "warning",
  },
  success: {
    background: "#dcfce7",
    borderLeft: `4px solid ${theme.green}`,
    color: theme.green,
    icon: "success",
  },
};

export const InlineMessage = ({ tone = "error", children }) => {
  const toneStyle = toneStyles[tone] || toneStyles.error;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 16px",
        borderRadius: 8,
        background: toneStyle.background,
        borderLeft: toneStyle.borderLeft,
        fontSize: 14,
        lineHeight: "1.5",
        color: toneStyle.color,
      }}
    >
      <Icon
        name={toneStyle.icon}
        size={20}
        color={toneStyle.color}
        style={{ flexShrink: 0, marginTop: 2 }}
      />
      <div>{children}</div>
    </div>
  );
};

export default InlineMessage;
