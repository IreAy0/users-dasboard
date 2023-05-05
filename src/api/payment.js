import ToNote from "@/Services/Tonote";

export default {
  getAllCards(){
    return ToNote.get(`/cards`);
  }
}