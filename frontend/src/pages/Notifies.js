import React from "react";
import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
  IconButton,
  Badge,
  Chip,
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  LocalOffer as OfferIcon,
  Event as EventIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

// Placeholder data for notifications
const dummyNotifications = [
  {
    id: 1,
    title: "Exclusive Offer: 20% Off Your Next Purchase!",
    description: "Use code BEATEN20 at checkout to get 20% off all items.",
    date: "2023-10-27",
    read: false,
    type: "offer",
  },
  {
    id: 2,
    title: "New Collection Dropping Soon!",
    description: "Our latest collection is arriving next week. Stay tuned!",
    date: "2023-10-25",
    read: true,
    type: "event",
  },
  {
    id: 3,
    title: "Welcome to BEATEN!",
    description:
      "Thank you for joining our community. Explore our collections.",
    date: "2023-10-20",
    read: true,
    type: "info",
  },
];

const getNotificationIcon = (type) => {
  switch (type) {
    case "offer":
      return <OfferIcon sx={{ color: "#ffd600" }} />;
    case "event":
      return <EventIcon sx={{ color: "#ff6b6b" }} />;
    default:
      return <InfoIcon sx={{ color: "#4dabf7" }} />;
  }
};

const Notifies = ({ mode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const notifications = dummyNotifications; // Using dummy data for now

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: { xs: 2, md: 4 },
        mb: { xs: 8, md: 4 },
        minHeight: "calc(100vh - 64px - 60px)",
        px: { xs: 2, md: 3 },
        bgcolor: mode === "dark" ? "#181818" : "#fff",
        color: mode === "dark" ? "#fff" : "#181818",
        transition: "background 0.3s, color 0.3s",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: { xs: "1.5rem", md: "2rem" },
            letterSpacing: "-0.02em",
          }}
        >
          Notifications
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "text.secondary",
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          Stay updated with your latest offers and updates
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <List sx={{ p: 0 }}>
          {notifications.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <NotificationsIcon
                sx={{
                  fontSize: 48,
                  color: "text.secondary",
                  opacity: 0.5,
                  mb: 2,
                }}
              />
              <Typography variant="body1" color="text.secondary">
                No notifications or offers at the moment.
              </Typography>
            </Box>
          ) : (
            notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    bgcolor: notification.read
                      ? "transparent"
                      : "rgba(0, 0, 0, 0.02)",
                    "&:hover": {
                      bgcolor: "rgba(0, 0, 0, 0.04)",
                    },
                    cursor: "pointer",
                    py: { xs: 2, md: 2.5 },
                    px: { xs: 2, md: 3 },
                  }}
                >
                  <Box sx={{ mr: 2, mt: 0.5 }}>
                    {getNotificationIcon(notification.type)}
                  </Box>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: notification.read ? 500 : 600,
                            fontSize: { xs: "0.95rem", md: "1rem" },
                          }}
                        >
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <Chip
                            label="New"
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.7rem",
                              bgcolor: "primary.main",
                              color: "white",
                            }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: { xs: "0.85rem", md: "0.9rem" },
                            mb: 0.5,
                          }}
                        >
                          {notification.description}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            fontSize: "0.75rem",
                            opacity: 0.8,
                          }}
                        >
                          {notification.date}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && (
                  <Divider
                    component="li"
                    sx={{
                      borderColor: "divider",
                      opacity: 0.5,
                    }}
                  />
                )}
              </React.Fragment>
            ))
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default Notifies;
