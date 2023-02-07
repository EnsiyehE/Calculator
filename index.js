"use strict";
import * as d3 from "d3";
import { autoType, text } from "d3";

let height = 300;
let width = 300;
const margin = { top: 400, bottom: 100, right: autoType, left: autoType };
let height_rect = 60;

let svg = d3
  .select("#Ensie")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("style", "outline: thin solid black")
  .style("padding", 20).style("background-color", "#454545");


// //add the g for the first above rect
let x_g = 20;

let g_rect = svg
  .append("g")


g_rect.append("rect")
  .attr("width", width - 40)
  .attr("height", height_rect)
  .attr("x", x_g)
  .attr("y", 20)
  .attr("fill", "white")
  .attr("style", "outline: thin solid black");

// const numbers = [7, 4, 1, 8, 5, 2, 9, 6, 3];

let data_list = [[7, 4, 1, 8, 5, 2, 9, 6, 3], ["*", "+", "-", "/"], ["C", 0, ".", "="]]



let height_but = 30;
let width_but = 30;
let space = 10;
const Padding = 20;
const spaceButtoms = 15;

let selectedNumbers = []

const calculatingY = function (d, i) {

  let y
  let y_0 = (Padding + height_rect + space)

  y = y_0 + (height_but + space) * i;

  if (i >= 3 && i < 6) {
    y = y_0 + (height_but + space) * (i - 3);
  }

  else if (i >= 6 && i < 9) {
    y = y_0 + (height_but + space) * (i - 6);
  }

  else if (i == 9 || i == 10) {
    y = y_0 + height_but / 2

  }
  else if (i == 11 || i == 12) {
    y = y_0 + (height_but + space) + height_but / 2


  }
  i >= 13 ? y = y_0 + (height_but + space) * 3 : " ";



  return y;
};

const firstButoomX = x_g

const calculatingX = function (d, i) {

  let x
  if (i >= 0 && i <= 2) {
    x = firstButoomX;
    return x

  }
  else if (i == 9 || i == 11) {
    x = x_g + 3 * (width_but + (space))
    return x
  }

  else if (i == 10 || i == 12) {
    x = x_g + 4 * (width_but) + 3 * (space)
    return x
  }

  else if (i >= 3 && i <= 5) {
    x = firstButoomX + width_but + space;
    return x
  }



  else if (i >= 13 && i <= 16) {
    x = firstButoomX + (i - 13) * (width_but + space);
    return x
  }

  else if (i > 5 && i < 9) {
    x = firstButoomX + (2 * width_but) + (2 * space)
    return x
  }

}


let counter = 0
let firsNumber = "";
let secondNumber = "";
let operator = "";
let count = 0
let result = "";
let lock1 = true
let lock2 = true


const calculationInt = function (i) {


  if (i === "C") {
    result = 0
    firsNumber = ""
    secondNumber = ""
    operator = ""
    lock1 = true
    lock2 = true

    return result

  }

  if (i >= 0 && i <= 9 && lock1 || i == ".") {
    firsNumber += i
  }




  if (i == "*" || i == "-" || i == "+" || i == "/") {
    operator = i
    lock1 = false
  }



  if (operator != "" && (i >= 0 && i <= 9 && lock2 || i == ".")) {
    secondNumber += i
  }

  result = `${firsNumber} ${operator} ${secondNumber}`
  console.log(result);

  if (i === "=") {
    switch (operator) {
      case '+':
        result = Number(firsNumber) + Number(secondNumber);
        break;
      case '-':
        result = Number(firsNumber) - Number(secondNumber);
        break;
      case '*':
        result = Number(firsNumber) * Number(secondNumber);
        break;
      case '/':
        result = Number(firsNumber) / Number(secondNumber);
        break;
      default:
        throw new Error(`Invalid operator ${operator}`);
    }

    lock2 = false
  }

  // console.log(result);
  return result
}





const buttoms = svg
  .selectAll("kk")
  .data(data_list.flat())
  .join("g")
  .append("rect")
  .attr("width", (d, i) => {
    if (i == 16) {
      return width_but = 50
    }

    return width_but
  })
  .attr("height", height_but)

  .attr("y", (d, i) => calculatingY(d, i))
  .attr("x", (d, i) => calculatingX(d, i))
  .on("click", (d, i) => {


    let finalresult = calculationInt(i)

    g_rect.select("text").remove()

    g_rect
      .append("text")
      .attr("x", width - 55)
      .attr("y", height_rect / 1.1)
      .text(`${finalresult}`)
      .style("font-size", "14px")
      .style('fill', 'balck')


    if (i === "C") {
      finalresult = calculationInt(i)
    }


  })
  .attr("fill", "#C0C0C0")
  .attr("style", "outline: thin solid black")


//text for numbers from 1 to 9
svg.selectAll("gg").data(data_list.flat())
  .join("g")
  .append("text")
  .text(d => d.toString())
  .attr("x", (d, i) => { return calculatingX(d, i) + width_but / 3 })
  .attr("y", (d, i) => { return calculatingY(d, i) + height_but / 2 })
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .style('fill', 'balck')




