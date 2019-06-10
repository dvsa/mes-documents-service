interface Personalisation {
  'ref number' : string;
  'test date' : string;
  'test time' : string;
  'first name' : string;
  'cat dead' : string;
}

export interface EmailPersonalisation extends Personalisation {

}

export interface LetterPersonalisation extends Personalisation {
  'address_line_1' : string;
  'address_line_2' : string;
  'address_line_3' ? : string;
  'address_line_4' ? : string;
  'address_line_5' ? : string;
  'address_line_6' ? : string;
  'postcode' : string;
}
