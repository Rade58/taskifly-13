"use client";
import { FC, useState } from "react";
import Modal from "react-modal";
import { createNewProject } from "@/lib/api";
import Button from "./Button";
import Input from "./Input";

Modal.setAppElement("#modal");

const NewProject: FC = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [name, setName] = useState("");

  return null;
};

export default NewProject;
