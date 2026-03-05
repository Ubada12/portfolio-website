/**
 * =============================================================================
 * PROJECT: Goat Detection
 * =============================================================================
 *
 * Computer vision system for real-time goat detection and tracking.
 * This is the fully populated showcase project with all rich content fields.
 *
 * DOCS: Points to /docs/goat-detection.html — the detail page will only show
 *       the docs button if that file actually exists in public/docs/.
 *
 * =============================================================================
 */

import type { ProjectDoc } from "./_template"

export const goatDetection: ProjectDoc = {
  /* ── Core ──────────────────────────────────────────────────────────────── */
  id: 5,
  slug: "goat-detection",
  title: "Goat Detection System",
  description:
    "A real-time computer vision system that detects and tracks goats using deep learning, built for agricultural monitoring.",
  /** NOTE: Placeholder image — replace with an actual goat-detection screenshot */
  image: "/images/modern-ecommerce-dashboard-dark-theme.jpg",
  tags: ["Python", "YOLOv8", "OpenCV", "PyTorch", "FastAPI"],
  link: "#",
  github: "#",
  githubPrivate: true,
  color: "#8b5cf6",

  /* ── Identity ──────────────────────────────────────────────────────────── */
  tagline: "Deep learning meets agriculture",
  status: "Live",
  year: "2024",
  duration: "4 months",
  category: "Computer Vision",

  /* ── Role ───────────────────────────────────────────────────────────────── */
  role: {
    title: "ML Engineer & Lead Developer",
    responsibilities: [
      "Collected and annotated a custom dataset of goat images",
      "Trained and fine-tuned a YOLOv8 object detection model",
      "Built the real-time inference pipeline with OpenCV",
      "Developed the FastAPI backend for serving predictions",
      "Created the monitoring dashboard and alert system",
    ],
  },

  /* ── Story ──────────────────────────────────────────────────────────────── */
  overview:
    "A production-grade computer vision pipeline that detects and tracks goats in real-time video feeds. Built to help farmers monitor livestock across large grazing areas, reducing manual labour and enabling early detection of strays or health anomalies.",
  problem:
    "Traditional livestock monitoring relies on manual headcounts and periodic patrols, which are time-consuming, error-prone, and impractical for large herds spread across open terrain. Farmers need a reliable automated system that works around the clock.",
  solution:
    "A custom-trained YOLOv8 model processes live camera feeds to detect, count, and track individual goats in real time. The system uses a lightweight FastAPI backend for inference serving and pushes alerts when anomalies are detected — such as a goat leaving the designated area or a sudden drop in headcount.",
  outcome:
    "The system achieved 94% detection accuracy on the test set and processes video at 30+ FPS on consumer-grade hardware. Field trials showed a 70% reduction in time spent on manual headcounts, and the alert system caught three stray incidents within the first month of deployment.",

  /* ── Metrics ────────────────────────────────────────────────────────────── */
  metrics: [
    { label: "Detection Accuracy", value: "94", suffix: "%" },
    { label: "Inference Speed", value: "30", suffix: "+ FPS" },
    { label: "Time Saved", value: "70", suffix: "%" },
    { label: "Dataset Size", value: "5,000", suffix: " images" },
  ],

  /* ── Highlights ─────────────────────────────────────────────────────────── */
  highlights: [
    {
      title: "Real-Time Detection",
      description:
        "Processes live camera feeds at 30+ FPS with sub-100ms latency per frame using an optimised YOLOv8 pipeline.",
      icon: "Zap",
    },
    {
      title: "Custom Dataset",
      description:
        "Hand-annotated 5,000+ images across varied lighting conditions, angles, and herd densities for robust model training.",
      icon: "Database",
    },
    {
      title: "Smart Alerts",
      description:
        "Automated notification system triggers alerts for stray detection, headcount drops, and zone boundary violations.",
      icon: "Bell",
    },
    {
      title: "Edge Deployment",
      description:
        "Optimised for inference on consumer-grade GPUs and edge devices, enabling on-site deployment without cloud dependency.",
      icon: "Cpu",
    },
  ],

  /* ── Challenges ─────────────────────────────────────────────────────────── */
  challenges: [
    {
      title: "Varied Lighting Conditions",
      description:
        "Outdoor environments introduce dramatic lighting changes throughout the day — from harsh midday sun to low-light dawn and dusk. The model needed extensive data augmentation and exposure normalisation to maintain accuracy across all conditions.",
    },
    {
      title: "Occlusion in Dense Herds",
      description:
        "When goats cluster together, partial occlusion makes individual detection difficult. We addressed this with anchor box tuning and non-maximum suppression threshold adjustments specific to our use case.",
    },
    {
      title: "Real-Time Performance on Edge Hardware",
      description:
        "Achieving 30+ FPS on a consumer GPU required model pruning, TensorRT optimisation, and a custom batching strategy for the inference pipeline.",
    },
  ],

  /* ── Tech Deep-Dive ─────────────────────────────────────────────────────── */
  techDetails: {
    summary:
      "The system is built around a fine-tuned YOLOv8 model served through a FastAPI backend. Video frames are captured via OpenCV, preprocessed, and sent through the detection pipeline. Results are tracked across frames using a simple IoU-based tracker, and anomalies are flagged to a monitoring dashboard.",
    stack: [
      { name: "YOLOv8", reason: "State-of-the-art real-time object detection with excellent speed-accuracy tradeoff" },
      { name: "PyTorch", reason: "Flexible deep learning framework for model training and fine-tuning" },
      { name: "OpenCV", reason: "Industry-standard library for video capture and image preprocessing" },
      { name: "FastAPI", reason: "High-performance async Python API framework for serving predictions" },
      { name: "TensorRT", reason: "NVIDIA inference optimiser for maximising throughput on GPU hardware" },
    ],
  },

  /* ── Docs ────────────────────────────────────────────────────────────────── */
  docsHtml: "/docs/goat-detection.html",

  /* ── Navigation ─────────────────────────────────────────────────────────── */
  prevProject: "real-estate-portal",
  nextProject: "e-commerce-platform",
}
