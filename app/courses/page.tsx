"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { SendHorizontal } from "lucide-react";

export default function TanfolyamokPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userInput: "",
    courses: {
      operator: false,
      editor: false,
      cutter: false,
      videoStaff: false,
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCourseChange = (course: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      courses: {
        ...prev.courses,
        [course]: checked,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-bss text-left mb-8">
            Tanfolyamok
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Information */}
            <div className="space-y-6">
              <div>
                <p className="text-foreground leading-relaxed">
                  Célunk előadások tartása, interjúk készítése,{" "}
                  <strong>egyenruhás</strong> vagy
                  <strong> felsőoktatási hallgatók</strong> szakmai fejlődésének
                  elősegítése. Ha érdekel a televíziózás, filmgyártás mibenléte,
                  és rendszeresen hallgatói jogviszonnyal, csatlakozz te is az
                  öntevékeny körünkhöz!
                </p>
              </div>

              <div>
                <p className="text-foreground leading-relaxed">
                  Gyere el <strong>ingyenes tanfolyamainkra</strong> és válj te
                  is a stúdió tagjává!
                </p>
              </div>

              <div>
                <p className="text-foreground leading-relaxed">
                  Ebben a félévben a{" "}
                  <strong>jelentkezési időszak lezárult</strong>, de ha a
                  következőkben nem szeretnél lemaradni tanfolyamainkról, akkor
                  töltsd ki az alábbi adatlapot és értesíteni fogunk a tanfolyam
                  indulásáról, valamint az adásainkról és a legfrissebb
                  stúdióval kapcsolatos hírekről is értesülni szeretnél, akkor
                  iratkozz fel hírlevelünkre itt az oldalunkon és látogass el
                  Facebook-oldalunkra is!
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-sm font-light text-gray-500"
                  >
                    Név
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="User input text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="text-sm font-light text-gray-700"
                  >
                    E-mail cím
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="User input text"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-light text-gray-500 mb-3 block">
                    Milyen tanfolyam érdekel?
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="operator"
                        checked={formData.courses.operator}
                        onCheckedChange={(checked) =>
                          handleCourseChange("operator", checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="operator"
                        className="text-sm text-foreground"
                      >
                        Operatőr tanfolyam
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="editor"
                        checked={formData.courses.editor}
                        onCheckedChange={(checked) =>
                          handleCourseChange("editor", checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="editor"
                        className="text-sm text-foreground"
                      >
                        Szerkesztő-riporter tanfolyam
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="cutter"
                        checked={formData.courses.cutter}
                        onCheckedChange={(checked) =>
                          handleCourseChange("cutter", checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="cutter"
                        className="text-sm text-foreground"
                      >
                        Vágó tanfolyam
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="videoStaff"
                        checked={formData.courses.videoStaff}
                        onCheckedChange={(checked) =>
                          handleCourseChange("videoStaff", checked as boolean)
                        }
                      />
                      <Label
                        htmlFor="videoStaff"
                        className="text-sm text-foreground"
                      >
                        Videóstáb tanfolyam
                      </Label>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-bss hover:bg-blue-700 text-white flex items-center"
                >
                  <span className="flex-1 text-center ml-8">Elküldés</span>
                  <span className="shrink-0">
                    <SendHorizontal />
                  </span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
