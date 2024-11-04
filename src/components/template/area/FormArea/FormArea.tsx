import { CardForm, FormInput, FormTextarea } from "@/components/atom";
import { useFormArea } from "@/hooks";

export const FormArea = () => {
  const {formik, isEdit, handleClose} = useFormArea()


  return (
    <CardForm
      title="Creacion de Area"
      description="Por favor, completa todos los campos del formulario."
      handleSubmit={formik.handleSubmit}
      isSubmitting={formik.isSubmitting}
      submitButtonText={ isEdit ? "Edit Área" :"Guardar Área"}
      onClose={handleClose}
      className="mt-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormInput
            label="Nombre del Área"
            name="name"
            placeholder="Ingrese el nombre del área"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.name}
          />
        </div>
        <div className="space-y-2">
          <FormTextarea
            label={"Descripcion"}
            name={"description"}
            placeholder={"ingrese la descripcion del area"}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={formik.errors.description}
          />
        </div>
      </div>
    </CardForm>
  );
};
