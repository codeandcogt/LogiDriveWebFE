// FormInspection.tsx
import { CardForm, FormInput, FormSelect } from "@/components/atom";
import { useFormInspection } from "@/hooks";
import { FieldArray, getIn, FormikProvider } from "formik";

export const FormInspection = () => {
  const {
    formik,
    handleClose,
    Type_Inspection,
    step,
    vehicleParts,
    isLoadingParts,
  } = useFormInspection();

  return (
    <FormikProvider value={formik}>
      <CardForm
        title="Registro de Inspección"
        description="Complete los detalles de la inspección del vehículo."
        className="mt-10"
        handleSubmit={formik.handleSubmit}
        isSubmitting={formik.isSubmitting}
        submitButtonText={step === 1 ? "Siguiente" : "Guardar Inspección"}
        onClose={handleClose}
      >
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campo para el comentario */}
            <div className="space-y-2">
              <FormInput
                label="Comentario"
                name="comment"
                placeholder="Ingrese un comentario sobre la inspección"
                value={formik.values.comment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.comment && formik.errors.comment
                    ? formik.errors.comment
                    : undefined
                }
              />
            </div>

            {/* Campo para el odómetro */}
            <div className="space-y-2">
              <FormInput
                label="Odómetro"
                name="odometer"
                placeholder="Ingrese el valor del odómetro"
                value={formik.values.odometer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.odometer && formik.errors.odometer
                    ? formik.errors.odometer
                    : undefined
                }
              />
            </div>

            {/* Campo para el combustible */}
            <div className="space-y-2">
              <FormInput
                label="Nivel de Combustible"
                name="fuel"
                placeholder="Ingrese el nivel de combustible"
                value={formik.values.fuel}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.fuel && formik.errors.fuel
                    ? formik.errors.fuel
                    : undefined
                }
              />
            </div>

            {/* Campo para el tipo de inspección */}
            <div className="space-y-2">
              <FormSelect
                label="Tipo de Inspección"
                name="typeInspection"
                placeholder="Seleccione el tipo de inspección"
                value={formik.values.typeInspection}
                options={Type_Inspection}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.typeInspection && formik.errors.typeInspection
                    ? formik.errors.typeInspection
                    : undefined
                }
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            {isLoadingParts ? (
              <p>Cargando partes del vehículo...</p>
            ) : (
              <FieldArray name="partsInspected">
                {() => (
                  <div>
                    {formik.values.partsInspected.map((part, index) => {
                      const commentError = getIn(
                        formik.errors,
                        `partsInspected.${index}.comment`
                      );
                      const commentTouched = getIn(
                        formik.touched,
                        `partsInspected.${index}.comment`
                      );

                      const statusError = getIn(
                        formik.errors,
                        `partsInspected.${index}.status`
                      );
                      const statusTouched = getIn(
                        formik.touched,
                        `partsInspected.${index}.status`
                      );

                      return (
                        <div key={index} className="space-y-2 border-b pb-4 mb-4">
                          <h4 className="font-bold">
                            {vehicleParts[index]?.name || `Parte ${index + 1}`}
                          </h4>
                          <FormInput
                            label="Comentario"
                            name={`partsInspected.${index}.comment`}
                            placeholder="Ingrese un comentario"
                            value={part.comment}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={
                              commentTouched && commentError ? commentError : undefined
                            }
                          />
                          <FormSelect
                            label="Estado"
                            name={`partsInspected.${index}.status`}
                            value={part.status ? "true" : "false"}
                            options={[
                              { value: "true", label: "Bueno" },
                              { value: "false", label: "Malo" },
                            ]}
                            onChange={(event) =>
                              formik.setFieldValue(
                                `partsInspected.${index}.status`,
                                event.target.value === "true"
                              )
                            }
                            helperText={
                              statusTouched && statusError ? statusError : undefined
                            }
                          />
                          {/* Campos adicionales si es necesario */}
                        </div>
                      );
                    })}
                  </div>
                )}
              </FieldArray>
            )}
          </div>
        )}
      </CardForm>
    </FormikProvider>
  );
};
